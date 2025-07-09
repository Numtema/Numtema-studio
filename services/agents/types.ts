// services/agents/types.ts
export interface Agent {
  id: string
  name: string
  description?: string
  model: string
  systemPrompt?: string
  temperature: number
  maxTokens: number
  tools: Record<string, any>
  memoryConfig: Record<string, any>
  userId: string
  projectId: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateAgentParams {
  name: string
  description?: string
  model: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  tools?: Record<string, any>
  memoryConfig?: Record<string, any>
  projectId: string
}

export interface UpdateAgentParams {
  name?: string
  description?: string
  model?: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  tools?: Record<string, any>
  memoryConfig?: Record<string, any>
}

export interface ExecuteAgentParams {
  input: string
  context?: Record<string, any>
}

export interface ExecuteAgentResponse {
  executionId: string
  result?: string
  status: "success" | "error" | "processing"
  error?: string
  traceId: string
  duration?: number
}

export interface ListAgentsParams {
  projectId?: string
  limit?: number
  offset?: number
}
