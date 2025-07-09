// lib/types.ts
export interface User {
  id: string
  email: string
  name: string
  plan: "free" | "pro" | "enterprise"
  apiKey?: string
  settings: Record<string, any>
  createdAt: string
  updatedAt: string
}

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

export interface Agent {
  id: string
  name: string
  description?: string
  model: string
  systemPrompt?: string
  temperature: number
  maxTokens: number
  tools: {
    rag?: boolean
    analytics?: boolean
    webSearch?: boolean
  }
  memoryConfig: {
    shortTerm?: boolean
    longTerm?: boolean
  }
  userId: string
  projectId: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  projectId: string
  userId: string
  config: {
    parallel?: boolean
    timeout?: number
    retryPolicy?: {
      maxRetries: number
      waitTime: number
    }
    notifications?: {
      onSuccess?: boolean
      onFailure?: boolean
    }
  }
  status: string
  createdAt: string
  updatedAt: string
  steps: WorkflowStep[]
}

export interface WorkflowStep {
  id: string
  workflowId: string
  stepOrder: number
  agentId: string
  name: string
  config: {
    input?: string
    context?: Record<string, any>
    condition?: string
  }
  dependsOn: string[]
  createdAt: string
}

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

export interface DashboardMetrics {
  totalExecutions: number
  successRate: number
  avgResponseTime: number
  activeAgents: number
  totalProjects: number
  errorRate: number
  throughput: number
  topAgents: Array<{
    agentId: string
    agentName: string
    executionCount: number
    successRate: number
  }>
  recentActivity: Array<{
    timestamp: string
    type: string
    agentName: string
    projectName: string
    status: string
  }>
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

export interface TimeSeriesData {
  timestamp: string
  executions: number
  errors: number
  avgResponseTime: number
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

export interface BatchResult {
  batchId: string
  totalJobs: number
  completedJobs: number
  failedJobs: number
  results: any[]
  status: "running" | "completed" | "failed"
}

export interface Notification {
  id: string
  type: "alert" | "info" | "success" | "error"
  title: string
  message: string
  metadata: Record<string, any>
  read: boolean
  createdAt: string
}

// UI State types
export interface UIState {
  sidebarOpen: boolean
  theme: "light" | "dark"
  currentProject?: Project
  selectedAgent?: Agent
}

// Form types
export interface CreateProjectForm {
  name: string
  description: string
  settings: {
    maxAgents: number
    defaultModel: string
    notifications: {
      email: boolean
      slack: string
    }
  }
}

export interface CreateAgentForm {
  name: string
  description: string
  model: string
  systemPrompt: string
  temperature: number
  maxTokens: number
  tools: {
    rag: boolean
    analytics: boolean
    webSearch: boolean
  }
  memoryConfig: {
    shortTerm: boolean
    longTerm: boolean
  }
  projectId: string
}

export interface CreateWorkflowForm {
  name: string
  description: string
  projectId: string
  config: {
    parallel: boolean
    timeout: number
    notifications: {
      onSuccess: boolean
      onFailure: boolean
    }
  }
  steps: Array<{
    agentId: string
    name: string
    stepOrder: number
    config: {
      input: string
      context: Record<string, any>
      condition?: string
    }
    dependsOn: string[]
  }>
}

// Chart data types
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
    fill?: boolean
  }>
}

// Workflow builder types
export interface WorkflowNode {
  id: string
  type: "agent" | "condition" | "parallel" | "merge"
  position: { x: number; y: number }
  data: {
    label: string
    agentId?: string
    config?: any
  }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  type?: string
  data?: {
    condition?: string
  }
}
