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
    condition?: string // JS expression pour exécution conditionnelle
  }
  dependsOn: string[]
  createdAt: string
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: "running" | "completed" | "failed" | "cancelled"
  inputData?: any
  outputData?: any
  errorMessage?: string
  startedAt: string
  completedAt?: string
  duration?: number
  stepExecutions: StepExecution[]
}

export interface StepExecution {
  id: string
  workflowExecutionId: string
  workflowStepId: string
  agentId: string
  status: "pending" | "running" | "completed" | "failed" | "skipped"
  inputData?: any
  outputData?: any
  errorMessage?: string
  startedAt?: string
  completedAt?: string
  duration?: number
}

export interface CreateWorkflowParams {
  name: string
  description?: string
  projectId: string
  config?: {
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
  steps: {
    agentId: string
    name: string
    stepOrder: number
    config?: {
      input?: string
      context?: Record<string, any>
      condition?: string
    }
    dependsOn?: string[]
  }[]
}

export interface ExecuteWorkflowParams {
  workflowId: string
  inputData?: any
  context?: Record<string, any>
}
