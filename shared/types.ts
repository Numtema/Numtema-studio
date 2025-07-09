// Types partagés entre tous les services

export interface User {
  id: string
  email: string
  name?: string
  plan: "free" | "pro" | "enterprise"
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  userId: string
  settings: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  name: string
  description?: string
  model: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  tools: Record<string, any>
  memoryConfig: Record<string, any>
  userId: string
  projectId?: string
  createdAt: string
  updatedAt: string
}

export interface ExecutionTrace {
  id: string
  agentId: string
  projectId?: string
  flowId: string
  nodeName: string
  status: "success" | "error" | "warning"
  durationMs: number
  inputData: Record<string, any>
  outputData: Record<string, any>
  errorMessage?: string
  timestamp: string
}

export interface AgentMetrics {
  id: string
  agentId: string
  cpuUsage: number
  memoryUsage: number
  requestCount: number
  errorCount: number
  avgResponseTime: number
  timestamp: string
}

export interface Notification {
  id: string
  userId: string
  type: "alert" | "info" | "success" | "error"
  title: string
  message: string
  read: boolean
  createdAt: string
}
