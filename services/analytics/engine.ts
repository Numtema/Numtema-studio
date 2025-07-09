import { query, queryRow } from "../../shared/database"
import type {
  DashboardMetrics,
  TimeSeriesData,
  AgentAnalytics,
  ProjectAnalytics,
  GetAnalyticsParams,
  RealtimeMetrics,
} from "./types"

export class AnalyticsEngine {
  async getDashboardMetrics(userId: string, timeframe = "24h"): Promise<DashboardMetrics> {
    const interval = this.getTimeInterval(timeframe)

    // Métriques globales
    const globalStats = await queryRow<any>(
      `
      SELECT 
        COUNT(t.*) as total_executions,
        COUNT(CASE WHEN t.status = 'success' THEN 1 END) as successful_executions,
        AVG(t.duration_ms) as avg_response_time,
        COUNT(DISTINCT a.id) as active_agents,
        COUNT(DISTINCT p.id) as total_projects
      FROM execution_traces t
      JOIN agents a ON t.agent_id = a.id
      JOIN projects p ON t.project_id = p.id
      WHERE a.user_id = $1 
      AND t.timestamp >= NOW() - INTERVAL '${interval}'
    `,
      [userId],
    )

    const totalExec = Number.parseInt(globalStats.total_executions) || 0
    const successfulExec = Number.parseInt(globalStats.successful_executions) || 0
    const successRate = totalExec > 0 ? (successfulExec / totalExec) * 100 : 0
    const errorRate = 100 - successRate

    // Top agents
    const topAgents = await query<any>(
      `
      SELECT 
        a.id as agent_id,
        a.name as agent_name,
        COUNT(t.id) as execution_count,
        (COUNT(CASE WHEN t.status = 'success' THEN 1 END) * 100.0 / COUNT(t.id)) as success_rate
      FROM agents a
      JOIN execution_traces t ON a.id = t.agent_id
      WHERE a.user_id = $1 
      AND t.timestamp >= NOW() - INTERVAL '${interval}'
      GROUP BY a.id, a.name
      ORDER BY execution_count DESC
      LIMIT 5
    `,
      [userId],
    )

    // Activité récente
    const recentActivity = await query<any>(
      `
      SELECT 
        t.timestamp,
        'execution' as type,
        a.name as agent_name,
        p.name as project_name,
        t.status
      FROM execution_traces t
      JOIN agents a ON t.agent_id = a.id
      JOIN projects p ON t.project_id = p.id
      WHERE a.user_id = $1
      ORDER BY t.timestamp DESC
      LIMIT 10
    `,
      [userId],
    )

    // Calcul du throughput (executions par heure)
    const throughput = this.calculateThroughput(totalExec, timeframe)

    return {
      totalExecutions: totalExec,
      successRate: Math.round(successRate * 100) / 100,
      avgResponseTime: Math.round(Number.parseFloat(globalStats.avg_response_time) || 0),
      activeAgents: Number.parseInt(globalStats.active_agents) || 0,
      totalProjects: Number.parseInt(globalStats.total_projects) || 0,
      errorRate: Math.round(errorRate * 100) / 100,
      throughput: Math.round(throughput * 100) / 100,
      topAgents: topAgents.map((agent) => ({
        agentId: agent.agent_id,
        agentName: agent.agent_name,
        executionCount: Number.parseInt(agent.execution_count),
        successRate: Math.round(Number.parseFloat(agent.success_rate) * 100) / 100,
      })),
      recentActivity: recentActivity.map((activity) => ({
        timestamp: activity.timestamp,
        type: activity.type,
        agentName: activity.agent_name,
        projectName: activity.project_name,
        status: activity.status,
      })),
    }
  }

  async getAgentAnalytics(agentId: string, userId: string, params: GetAnalyticsParams): Promise<AgentAnalytics> {
    const interval = this.getTimeInterval(params.timeframe)

    // Vérifier que l'agent appartient à l'utilisateur
    const agent = await queryRow<any>(
      `SELECT a.*, COUNT(t.id) as total_executions
       FROM agents a
       LEFT JOIN execution_traces t ON a.id = t.agent_id 
         AND t.timestamp >= NOW() - INTERVAL '${interval}'
       WHERE a.id = $1 AND a.user_id = $2
       GROUP BY a.id`,
      [agentId, userId],
    )

    if (!agent) {
      throw new Error("Agent not found")
    }

    // Statistiques détaillées
    const stats = await queryRow<any>(
      `
      SELECT 
        COUNT(*) as total_executions,
        (COUNT(CASE WHEN status = 'success' THEN 1 END) * 100.0 / COUNT(*)) as success_rate,
        AVG(duration_ms) as avg_response_time,
        (COUNT(CASE WHEN status = 'error' THEN 1 END) * 100.0 / COUNT(*)) as error_rate
      FROM execution_traces 
      WHERE agent_id = $1 
      AND timestamp >= NOW() - INTERVAL '${interval}'
    `,
      [agentId],
    )

    // Distribution des erreurs
    const errorDistribution = await query<any>(
      `
      SELECT 
        COALESCE(error_message, 'Unknown') as error_type,
        COUNT(*) as count
      FROM execution_traces 
      WHERE agent_id = $1 
      AND status = 'error'
      AND timestamp >= NOW() - INTERVAL '${interval}'
      GROUP BY error_message
      ORDER BY count DESC
      LIMIT 5
    `,
      [agentId],
    )

    const totalErrors = errorDistribution.reduce((sum, err) => sum + Number.parseInt(err.count), 0)

    // Série temporelle si demandée
    let timeSeries: TimeSeriesData[] = []
    if (params.includeTimeSeries) {
      timeSeries = await this.getTimeSeries(agentId, params.timeframe)
    }

    // Calcul du score de popularité (basé sur fréquence d'utilisation)
    const popularityScore = this.calculatePopularityScore(
      Number.parseInt(stats.total_executions),
      Number.parseFloat(stats.success_rate),
    )

    // Tendance de performance
    const performanceTrend = await this.calculatePerformanceTrend(agentId, params.timeframe)

    return {
      agentId,
      agentName: agent.name,
      totalExecutions: Number.parseInt(stats.total_executions) || 0,
      successRate: Math.round(Number.parseFloat(stats.success_rate) * 100) / 100 || 0,
      avgResponseTime: Math.round(Number.parseFloat(stats.avg_response_time)) || 0,
      errorRate: Math.round(Number.parseFloat(stats.error_rate) * 100) / 100 || 0,
      popularityScore: Math.round(popularityScore),
      timeSeries,
      errorDistribution: errorDistribution.map((err) => ({
        errorType: err.error_type,
        count: Number.parseInt(err.count),
        percentage: totalErrors > 0 ? Math.round((Number.parseInt(err.count) / totalErrors) * 100) : 0,
      })),
      performanceTrend,
    }
  }

  async getProjectAnalytics(projectId: string, userId: string, params: GetAnalyticsParams): Promise<ProjectAnalytics> {
    const interval = this.getTimeInterval(params.timeframe)

    // Vérifier que le projet appartient à l'utilisateur
    const project = await queryRow<any>(`SELECT * FROM projects WHERE id = $1 AND user_id = $2`, [projectId, userId])

    if (!project) {
      throw new Error("Project not found")
    }

    // Statistiques du projet
    const stats = await queryRow<any>(
      `
      SELECT 
        COUNT(t.*) as total_executions,
        COUNT(DISTINCT a.id) as unique_agents,
        AVG(duration_ms) as avg_response_time
      FROM execution_traces t
      JOIN agents a ON t.agent_id = a.id
      WHERE t.project_id = $1 
      AND t.timestamp >= NOW() - INTERVAL '${interval}'
    `,
      [projectId],
    )

    // Agent le plus actif
    const mostActiveAgent = await queryRow<any>(
      `
      SELECT 
        a.id as agent_id,
        a.name as agent_name,
        COUNT(t.id) as execution_count
      FROM agents a
      JOIN execution_traces t ON a.id = t.agent_id
      WHERE t.project_id = $1 
      AND t.timestamp >= NOW() - INTERVAL '${interval}'
      GROUP BY a.id, a.name
      ORDER BY execution_count DESC
      LIMIT 1
    `,
      [projectId],
    )

    // Analyse des coûts (simulation basée sur les tokens)
    const costAnalysis = await this.calculateCostAnalysis(projectId, params.timeframe)

    // Tendance d'exécution
    const executionTrend = await this.getProjectTimeSeries(projectId, params.timeframe)

    const totalExec = Number.parseInt(stats.total_executions) || 0
    const uniqueAgents = Number.parseInt(stats.unique_agents) || 0

    return {
      projectId,
      projectName: project.name,
      totalExecutions: totalExec,
      uniqueAgents,
      avgExecutionsPerAgent: uniqueAgents > 0 ? Math.round(totalExec / uniqueAgents) : 0,
      mostActiveAgent: mostActiveAgent
        ? {
            agentId: mostActiveAgent.agent_id,
            agentName: mostActiveAgent.agent_name,
            executionCount: Number.parseInt(mostActiveAgent.execution_count),
          }
        : { agentId: "", agentName: "None", executionCount: 0 },
      executionTrend,
      costAnalysis,
    }
  }

  async getRealtimeMetrics(): Promise<RealtimeMetrics> {
    // Métriques en temps réel (dernières 5 minutes)
    const realtimeStats = await queryRow<any>(`
      SELECT 
        COUNT(*) as current_executions,
        (COUNT(CASE WHEN status = 'error' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)) as error_rate,
        AVG(duration_ms) as avg_response_time
      FROM execution_traces 
      WHERE timestamp >= NOW() - INTERVAL '5 minutes'
    `)

    // Jobs en attente
    const queueDepth = await queryRow<{ count: string }>(`SELECT COUNT(*) as count FROM jobs WHERE status = 'pending'`)

    // Simulation de métriques système
    const systemLoad = Math.random() * 100 // CPU %
    const activeConnections = Math.floor(Math.random() * 50) + 10

    const executions = Number.parseInt(realtimeStats.current_executions) || 0
    const throughput = executions * 12 // Extrapoler sur une heure

    return {
      activeConnections,
      currentThroughput: throughput,
      systemLoad: Math.round(systemLoad),
      queueDepth: Number.parseInt(queueDepth?.count) || 0,
      errorRate: Math.round(Number.parseFloat(realtimeStats.error_rate) * 100) / 100 || 0,
      responseTime: Math.round(Number.parseFloat(realtimeStats.avg_response_time)) || 0,
      timestamp: new Date().toISOString(),
    }
  }

  private getTimeInterval(timeframe: string): string {
    const intervals: { [key: string]: string } = {
      "1h": "1 hour",
      "24h": "24 hours",
      "7d": "7 days",
      "30d": "30 days",
      "90d": "90 days",
    }
    return intervals[timeframe] || "24 hours"
  }

  private calculateThroughput(totalExecutions: number, timeframe: string): number {
    const hours: { [key: string]: number } = {
      "1h": 1,
      "24h": 24,
      "7d": 24 * 7,
      "30d": 24 * 30,
      "90d": 24 * 90,
    }

    const timeHours = hours[timeframe] || 24
    return totalExecutions / timeHours
  }

  private calculatePopularityScore(executions: number, successRate: number): number {
    // Score basé sur utilisation et qualité
    const usageScore = Math.min(executions / 100, 1) * 50 // Max 50 points
    const qualityScore = (successRate / 100) * 50 // Max 50 points
    return usageScore + qualityScore
  }

  private async calculatePerformanceTrend(
    agentId: string,
    timeframe: string,
  ): Promise<"improving" | "stable" | "declining"> {
    // Comparer la performance des 2 dernières périodes
    const interval = this.getTimeInterval(timeframe)

    const recentStats = await queryRow<any>(
      `
      SELECT AVG(duration_ms) as avg_time
      FROM execution_traces 
      WHERE agent_id = $1 
      AND timestamp >= NOW() - INTERVAL '${interval}'
    `,
      [agentId],
    )

    const previousStats = await queryRow<any>(
      `
      SELECT AVG(duration_ms) as avg_time
      FROM execution_traces 
      WHERE agent_id = $1 
      AND timestamp >= (NOW() - INTERVAL '${interval}' * 2)
      AND timestamp < (NOW() - INTERVAL '${interval}')
    `,
      [agentId],
    )

    const recentTime = Number.parseFloat(recentStats.avg_time) || 0
    const previousTime = Number.parseFloat(previousStats.avg_time) || 0

    if (previousTime === 0) return "stable"

    const improvement = (previousTime - recentTime) / previousTime

    if (improvement > 0.1) return "improving"
    if (improvement < -0.1) return "declining"
    return "stable"
  }

  private async getTimeSeries(agentId: string, timeframe: string): Promise<TimeSeriesData[]> {
    const bucketSize = this.getBucketSize(timeframe)

    const timeSeries = await query<any>(
      `
      SELECT 
        date_trunc('${bucketSize}', timestamp) as bucket,
        COUNT(*) as executions,
        COUNT(CASE WHEN status = 'error' THEN 1 END) as errors,
        AVG(duration_ms) as avg_response_time
      FROM execution_traces 
      WHERE agent_id = $1 
      AND timestamp >= NOW() - INTERVAL '${this.getTimeInterval(timeframe)}'
      GROUP BY bucket
      ORDER BY bucket
    `,
      [agentId],
    )

    return timeSeries.map((ts) => ({
      timestamp: ts.bucket,
      executions: Number.parseInt(ts.executions),
      errors: Number.parseInt(ts.errors),
      avgResponseTime: Math.round(Number.parseFloat(ts.avg_response_time)),
    }))
  }

  private async getProjectTimeSeries(projectId: string, timeframe: string): Promise<TimeSeriesData[]> {
    const bucketSize = this.getBucketSize(timeframe)

    const timeSeries = await query<any>(
      `
      SELECT 
        date_trunc('${bucketSize}', timestamp) as bucket,
        COUNT(*) as executions,
        COUNT(CASE WHEN status = 'error' THEN 1 END) as errors,
        AVG(duration_ms) as avg_response_time
      FROM execution_traces 
      WHERE project_id = $1 
      AND timestamp >= NOW() - INTERVAL '${this.getTimeInterval(timeframe)}'
      GROUP BY bucket
      ORDER BY bucket
    `,
      [projectId],
    )

    return timeSeries.map((ts) => ({
      timestamp: ts.bucket,
      executions: Number.parseInt(ts.executions),
      errors: Number.parseInt(ts.errors),
      avgResponseTime: Math.round(Number.parseFloat(ts.avg_response_time)),
    }))
  }

  private getBucketSize(timeframe: string): string {
    const buckets: { [key: string]: string } = {
      "1h": "minute",
      "24h": "hour",
      "7d": "hour",
      "30d": "day",
      "90d": "day",
    }
    return buckets[timeframe] || "hour"
  }

  private async calculateCostAnalysis(projectId: string, timeframe: string): Promise<any> {
    // Simulation de calcul de coûts basé sur les tokens estimés
    const interval = this.getTimeInterval(timeframe)

    const stats = await queryRow<any>(
      `
      SELECT 
        COUNT(*) as total_executions,
        AVG(duration_ms) as avg_duration
      FROM execution_traces 
      WHERE project_id = $1 
      AND timestamp >= NOW() - INTERVAL '${interval}'
      AND status = 'success'
    `,
      [projectId],
    )

    const executions = Number.parseInt(stats.total_executions) || 0
    const avgDuration = Number.parseFloat(stats.avg_duration) || 1000

    // Estimation grossière des tokens (basée sur durée)
    const estimatedTokensPerExecution = Math.round(avgDuration / 10) // 1 token per 10ms rough estimate
    const totalTokens = executions * estimatedTokensPerExecution

    // Coût estimé (prix fictif)
    const costPerThousandTokens = 0.002 // $0.002 per 1k tokens
    const estimatedCost = (totalTokens / 1000) * costPerThousandTokens

    return {
      totalTokens,
      estimatedCost: Math.round(estimatedCost * 100) / 100,
      costPerExecution: executions > 0 ? Math.round((estimatedCost / executions) * 10000) / 10000 : 0,
    }
  }
}

export const analyticsEngine = new AnalyticsEngine()
