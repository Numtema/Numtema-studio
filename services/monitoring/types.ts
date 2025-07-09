export interface ExecutionTrace {
  id: string
  agentId: string
  projectId: string
  executionId: string
  flowId: string
  nodeName: string
  status: "success" | "error" | "warning" | "processing"
  duration: number
  inputData: any
  outputData?: any
  errorMessage?: string
  timestamp: string
}

export interface AgentMetrics {
  id: string
  agentId: string
  cpuUsage?: number
  memoryUsage?: number
  requestCount: number
  errorCount: number
  successCount: number
  avgResponseTime: number
  timestamp: string
}

export interface GetTracesParams {
  agentId?: string
  projectId?: string
  status?: string
  limit?: number
  offset?: number
  startDate?: string
  endDate?: string
}

export interface GetMetricsParams {
  agentId?: string
  projectId?: string
  timeframe?: "1h" | "24h" | "7d" | "30d"
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "down"
  timestamp: string
  checks: {
    database: boolean
    llmProviders: boolean
    memoryUsage: number
    responseTime: number
  }
}
