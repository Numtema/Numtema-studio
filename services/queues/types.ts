export interface JobQueue {
  id: string
  name: string
  maxConcurrency: number
  priority: number
  createdAt: string
}

export interface Job {
  id: string
  queueName: string
  jobType: "agent_execution" | "workflow_execution" | "batch_processing" | "data_export"
  payload: any
  status: "pending" | "running" | "completed" | "failed" | "cancelled"
  priority: number
  maxRetries: number
  retryCount: number
  scheduledAt: string
  startedAt?: string
  completedAt?: string
  errorMessage?: string
  resultData?: any
  createdAt: string
}

export interface CreateJobParams {
  queueName: string
  jobType: "agent_execution" | "workflow_execution" | "batch_processing" | "data_export"
  payload: any
  priority?: number
  maxRetries?: number
  scheduledAt?: string
}

export interface BatchProcessingParams {
  projectId: string
  agentIds: string[]
  inputs: string[]
  batchSize?: number
  parallelism?: number
}

export interface BatchResult {
  batchId: string
  totalJobs: number
  completedJobs: number
  failedJobs: number
  results: any[]
  status: "running" | "completed" | "failed"
}
