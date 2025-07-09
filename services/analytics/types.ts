export interface DashboardMetrics {
  totalExecutions: number
  successRate: number
  avgResponseTime: number
  activeAgents: number
  totalProjects: number
  errorRate: number
  throughput: number // executions per hour
  topAgents: Array<{
    agentId: string
    agentName: string
    executionCount: number
    successRate: number
  }>
  recentActivity: Array<{
    timestamp: string
    type: "execution" | "error" | "agent_created"
    agentName: string
    projectName: string
    status: string
  }>
}

export interface TimeSeriesData {
  timestamp: string
  executions: number
  errors: number
  avgResponseTime: number
}

export interface AgentAnalytics {
  agentId: string
  agentName: string
  totalExecutions: number
  successRate: number
  avgResponseTime: number
  errorRate: number
  popularityScore: number
  timeSeries: TimeSeriesData[]
  errorDistribution: Array<{
    errorType: string
    count: number
    percentage: number
  }>
  performanceTrend: "improving" | "stable" | "declining"
}

export interface ProjectAnalytics {
  projectId: string
  projectName: string
  totalExecutions: number
  uniqueAgents: number
  avgExecutionsPerAgent: number
  mostActiveAgent: {
    agentId: string
    agentName: string
    executionCount: number
  }
  executionTrend: TimeSeriesData[]
  costAnalysis: {
    totalTokens: number
    estimatedCost: number
    costPerExecution: number
  }
}

export interface GetAnalyticsParams {
  timeframe: "1h" | "24h" | "7d" | "30d" | "90d"
  projectId?: string
  agentId?: string
  includeTimeSeries?: boolean
}

export interface RealtimeMetrics {
  activeConnections: number
  currentThroughput: number
  systemLoad: number
  queueDepth: number
  errorRate: number
  responseTime: number
  timestamp: string
}
