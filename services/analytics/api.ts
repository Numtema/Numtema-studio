import { api, APIError } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { analyticsEngine } from "./engine"
import type { DashboardMetrics, AgentAnalytics, ProjectAnalytics, GetAnalyticsParams, RealtimeMetrics } from "./types"
import crypto from "crypto"

// Dashboard principal
export const getDashboard = api<{ timeframe?: string }, { metrics: DashboardMetrics }>(
  { expose: true, method: "GET", path: "/analytics/dashboard", auth: true },
  async ({ timeframe = "24h" }): Promise<{ metrics: DashboardMetrics }> => {
    const { userId } = getAuthData()!

    const metrics = await analyticsEngine.getDashboardMetrics(userId, timeframe)

    return { metrics }
  },
)

// Analytics d'un agent spécifique
export const getAgentAnalytics = api<{ agentId: string } & GetAnalyticsParams, { analytics: AgentAnalytics }>(
  { expose: true, method: "GET", path: "/analytics/agents/:agentId", auth: true },
  async (params): Promise<{ analytics: AgentAnalytics }> => {
    const { userId } = getAuthData()!

    const analytics = await analyticsEngine.getAgentAnalytics(params.agentId, userId, {
      timeframe: params.timeframe || "24h",
      includeTimeSeries: params.includeTimeSeries || false,
      projectId: params.projectId,
      agentId: params.agentId,
    })

    return { analytics }
  },
)

// Analytics d'un projet spécifique
export const getProjectAnalytics = api<{ projectId: string } & GetAnalyticsParams, { analytics: ProjectAnalytics }>(
  { expose: true, method: "GET", path: "/analytics/projects/:projectId", auth: true },
  async (params): Promise<{ analytics: ProjectAnalytics }> => {
    const { userId } = getAuthData()!

    const analytics = await analyticsEngine.getProjectAnalytics(params.projectId, userId, {
      timeframe: params.timeframe || "24h",
      includeTimeSeries: params.includeTimeSeries || false,
      projectId: params.projectId,
      agentId: params.agentId,
    })

    return { analytics }
  },
)

// Métriques temps réel
export const getRealtimeMetrics = api<{}, { metrics: RealtimeMetrics }>(
  { expose: true, method: "GET", path: "/analytics/realtime", auth: true },
  async (): Promise<{ metrics: RealtimeMetrics }> => {
    const metrics = await analyticsEngine.getRealtimeMetrics()

    return { metrics }
  },
)

// Export de données
export const exportData = api<
  {
    projectId?: string
    agentId?: string
    format: "csv" | "json" | "xlsx"
    startDate: string
    endDate: string
    includeTraces?: boolean
    includeMetrics?: boolean
  },
  { exportId: string; downloadUrl: string }
>(
  { expose: true, method: "POST", path: "/analytics/export", auth: true },
  async (params): Promise<{ exportId: string; downloadUrl: string }> => {
    const { userId } = getAuthData()!

    // TODO: Implémenter l'export réel
    const exportId = crypto.randomUUID()
    const downloadUrl = `https://exports.numtema.com/${exportId}.${params.format}`

    // Créer un job d'export en arrière-plan
    // await createJob({
    //   queueName: 'data_export',
    //   jobType: 'data_export',
    //   payload: { ...params, userId, exportId }
    // });

    return { exportId, downloadUrl }
  },
)

// Comparaison d'agents
export const compareAgents = api<
  {
    agentIds: string[]
    timeframe?: string
  },
  { comparison: any }
>(
  { expose: true, method: "POST", path: "/analytics/compare", auth: true },
  async ({ agentIds, timeframe = "24h" }): Promise<{ comparison: any }> => {
    const { userId } = getAuthData()!

    if (agentIds.length < 2 || agentIds.length > 5) {
      throw APIError.invalidArgument("Can compare 2-5 agents at once")
    }

    // Récupérer les analytics de chaque agent
    const comparisons = await Promise.all(
      agentIds.map((agentId) =>
        analyticsEngine.getAgentAnalytics(agentId, userId, {
          timeframe,
          includeTimeSeries: true,
          agentId,
        }),
      ),
    )

    // Calculer des métriques de comparaison
    const comparison = {
      agents: comparisons,
      summary: {
        totalExecutions: comparisons.reduce((sum, agent) => sum + agent.totalExecutions, 0),
        avgSuccessRate: comparisons.reduce((sum, agent) => sum + agent.successRate, 0) / comparisons.length,
        bestPerformer: comparisons.reduce((best, agent) => (agent.successRate > best.successRate ? agent : best)),
        mostUsed: comparisons.reduce((most, agent) => (agent.totalExecutions > most.totalExecutions ? agent : most)),
      },
    }

    return { comparison }
  },
)
