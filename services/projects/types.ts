export interface Project {
  id: string
  name: string
  description?: string
  userId: string
  settings: {
    maxAgents?: number
    defaultModel?: string
    retryPolicy?: {
      maxRetries: number
      waitTime: number
    }
    notifications?: {
      slack?: string
      email?: boolean
    }
  }
  status: string
  agentCount: number
  createdAt: string
  updatedAt: string
}

export interface CreateProjectParams {
  name: string
  description?: string
  settings?: {
    maxAgents?: number
    defaultModel?: string
    retryPolicy?: {
      maxRetries: number
      waitTime: number
    }
    notifications?: {
      slack?: string
      email?: boolean
    }
  }
}

export interface UpdateProjectParams {
  name?: string
  description?: string
  settings?: {
    maxAgents?: number
    defaultModel?: string
    retryPolicy?: {
      maxRetries: number
      waitTime: number
    }
    notifications?: {
      slack?: string
      email?: boolean
    }
  }
}

export interface ProjectStats {
  totalExecutions: number
  successRate: number
  avgResponseTime: number
  totalErrors: number
  activeAgents: number
}
