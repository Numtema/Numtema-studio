export const typeDefs = `
  scalar DateTime
  scalar JSON

  type User {
    id: ID!
    email: String!
    name: String!
    plan: String!
    projects: [Project!]!
    createdAt: DateTime!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    agents: [Agent!]!
    stats: ProjectStats!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Agent {
    id: ID!
    name: String!
    description: String
    model: String!
    systemPrompt: String
    temperature: Float!
    maxTokens: Int!
    tools: JSON!
    memoryConfig: JSON!
    status: String!
    executions(limit: Int = 10): [Execution!]!
    analytics(timeframe: Timeframe = DAY): AgentAnalytics!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Execution {
    id: ID!
    status: ExecutionStatus!
    duration: Int
    inputData: JSON
    outputData: JSON
    errorMessage: String
    timestamp: DateTime!
  }

  type Workflow {
    id: ID!
    name: String!
    description: String
    config: JSON!
    status: String!
    steps: [WorkflowStep!]!
    executions(limit: Int = 10): [WorkflowExecution!]!
    createdAt: DateTime!
  }

  type WorkflowStep {
    id: ID!
    name: String!
    stepOrder: Int!
    agent: Agent!
    config: JSON!
    dependsOn: [ID!]!
  }

  type WorkflowExecution {
    id: ID!
    status: WorkflowExecutionStatus!
    inputData: JSON
    outputData: JSON
    duration: Int
    startedAt: DateTime!
    completedAt: DateTime
    stepExecutions: [StepExecution!]!
  }

  type StepExecution {
    id: ID!
    step: WorkflowStep!
    status: StepExecutionStatus!
    inputData: JSON
    outputData: JSON
    errorMessage: String
    duration: Int
    startedAt: DateTime
    completedAt: DateTime
  }

  type Job {
    id: ID!
    queueName: String!
    jobType: JobType!
    payload: JSON!
    status: JobStatus!
    priority: Int!
    scheduledAt: DateTime!
    startedAt: DateTime
    completedAt: DateTime
    errorMessage: String
    resultData: JSON
  }

  type ProjectStats {
    totalExecutions: Int!
    successRate: Float!
    avgResponseTime: Float!
    totalErrors: Int!
    activeAgents: Int!
  }

  type AgentAnalytics {
    totalExecutions: Int!
    successRate: Float!
    avgResponseTime: Float!
    errorRate: Float!
    popularityScore: Int!
    performanceTrend: PerformanceTrend!
    timeSeries: [TimeSeriesData!]!
    errorDistribution: [ErrorDistribution!]!
  }

  type TimeSeriesData {
    timestamp: DateTime!
    executions: Int!
    errors: Int!
    avgResponseTime: Float!
  }

  type ErrorDistribution {
    errorType: String!
    count: Int!
    percentage: Float!
  }

  type DashboardMetrics {
    totalExecutions: Int!
    successRate: Float!
    avgResponseTime: Float!
    activeAgents: Int!
    totalProjects: Int!
    errorRate: Float!
    throughput: Float!
    topAgents: [TopAgent!]!
    recentActivity: [Activity!]!
  }

  type TopAgent {
    agent: Agent!
    executionCount: Int!
    successRate: Float!
  }

  type Activity {
    timestamp: DateTime!
    type: String!
    agentName: String!
    projectName: String!
    status: String!
  }

  enum Timeframe {
    HOUR
    DAY
    WEEK
    MONTH
    QUARTER
  }

  enum ExecutionStatus {
    SUCCESS
    ERROR
    WARNING
    PROCESSING
  }

  enum WorkflowExecutionStatus {
    RUNNING
    COMPLETED
    FAILED
    CANCELLED
  }

  enum StepExecutionStatus {
    PENDING
    RUNNING
    COMPLETED
    FAILED
    SKIPPED
  }

  enum JobType {
    AGENT_EXECUTION
    WORKFLOW_EXECUTION
    BATCH_PROCESSING
    DATA_EXPORT
  }

  enum JobStatus {
    PENDING
    RUNNING
    COMPLETED
    FAILED
    CANCELLED
  }

  enum PerformanceTrend {
    IMPROVING
    STABLE
    DECLINING
  }

  # Inputs
  input CreateProjectInput {
    name: String!
    description: String
    settings: JSON
  }

  input CreateAgentInput {
    name: String!
    description: String
    model: String!
    systemPrompt: String
    temperature: Float = 0.7
    maxTokens: Int = 1000
    tools: JSON
    memoryConfig: JSON
    projectId: ID!
  }

  input UpdateAgentInput {
    name: String
    description: String
    model: String
    systemPrompt: String
    temperature: Float
    maxTokens: Int
    tools: JSON
    memoryConfig: JSON
  }

  input ExecuteAgentInput {
    agentId: ID!
    input: String!
    context: JSON
  }

  input CreateWorkflowInput {
    name: String!
    description: String
    projectId: ID!
    config: JSON
    steps: [WorkflowStepInput!]!
  }

  input WorkflowStepInput {
    agentId: ID!
    name: String!
    stepOrder: Int!
    config: JSON
    dependsOn: [ID!]
  }

  input ExecuteWorkflowInput {
    workflowId: ID!
    inputData: JSON
    context: JSON
  }

  # Queries
  type Query {
    # User & Auth
    me: User!
    
    # Projects
    projects: [Project!]!
    project(id: ID!): Project
    
    # Agents
    agents(projectId: ID): [Agent!]!
    agent(id: ID!): Agent
    
    # Workflows
    workflows(projectId: ID): [Workflow!]!
    workflow(id: ID!): Workflow
    
    # Executions
    executions(agentId: ID, projectId: ID, limit: Int = 20): [Execution!]!
    execution(id: ID!): Execution
    
    # Workflow Executions
    workflowExecutions(workflowId: ID, projectId: ID, limit: Int = 20): [WorkflowExecution!]!
    workflowExecution(id: ID!): WorkflowExecution
    
    # Jobs & Queues
    jobs(queueName: String, status: JobStatus, limit: Int = 20): [Job!]!
    job(id: ID!): Job
    
    # Analytics
    dashboard(timeframe: Timeframe = DAY): DashboardMetrics!
    agentAnalytics(agentId: ID!, timeframe: Timeframe = DAY): AgentAnalytics!
    projectAnalytics(projectId: ID!, timeframe: Timeframe = DAY): ProjectAnalytics!
    compareAgents(agentIds: [ID!]!, timeframe: Timeframe = DAY): JSON!
    
    # System
    health: JSON!
    realtimeMetrics: JSON!
  }

  # Mutations
  type Mutation {
    # Projects
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: CreateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    
    # Agents
    createAgent(input: CreateAgentInput!): Agent!
    updateAgent(id: ID!, input: UpdateAgentInput!): Agent!
    deleteAgent(id: ID!): Boolean!
    executeAgent(input: ExecuteAgentInput!): Execution!
    
    # Workflows
    createWorkflow(input: CreateWorkflowInput!): Workflow!
    updateWorkflow(id: ID!, input: CreateWorkflowInput!): Workflow!
    deleteWorkflow(id: ID!): Boolean!
    executeWorkflow(input: ExecuteWorkflowInput!): WorkflowExecution!
    
    # Jobs
    cancelJob(id: ID!): Boolean!
    retryJob(id: ID!): Job!
    
    # Batch Processing
    processBatch(projectId: ID!, agentIds: [ID!]!, inputs: [String!]!): Job!
    
    # Data Export
    exportData(projectId: ID, agentId: ID, format: String!, startDate: DateTime!, endDate: DateTime!): Job!
  }

  # Subscriptions
  type Subscription {
    # Real-time execution updates
    executionUpdates(agentId: ID): Execution!
    workflowExecutionUpdates(workflowId: ID): WorkflowExecution!
    
    # Real-time metrics
    metricsUpdates: JSON!
    agentMetricsUpdates(agentId: ID!): JSON!
    projectMetricsUpdates(projectId: ID!): JSON!
    
    # Job updates
    jobUpdates(queueName: String): Job!
    
    # System notifications
    notifications: JSON!
  }
`
