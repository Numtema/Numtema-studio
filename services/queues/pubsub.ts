import { Topic, Subscription } from "encore.dev/pubsub"

// Topics pour événements système
export interface AgentExecutionEvent {
  agentId: string
  executionId: string
  status: "started" | "completed" | "failed"
  userId: string
  projectId: string
  timestamp: string
}

export interface WorkflowExecutionEvent {
  workflowId: string
  executionId: string
  status: "started" | "step_completed" | "completed" | "failed"
  userId: string
  projectId: string
  stepName?: string
  timestamp: string
}

export interface MetricsEvent {
  agentId: string
  projectId: string
  metrics: {
    requestCount: number
    errorCount: number
    avgResponseTime: number
  }
  timestamp: string
}

// Création des topics
export const agentEvents = new Topic<AgentExecutionEvent>("agent-events", {
  deliveryGuarantee: "at-least-once",
})

export const workflowEvents = new Topic<WorkflowExecutionEvent>("workflow-events", {
  deliveryGuarantee: "at-least-once",
})

export const metricsEvents = new Topic<MetricsEvent>("metrics-events", {
  deliveryGuarantee: "at-least-once",
})

// Subscriptions pour traitement des événements
const _ = new Subscription(agentEvents, "update-agent-metrics", {
  handler: async (event: AgentExecutionEvent) => {
    if (event.status === "completed") {
      // Mettre à jour les métriques d'agent
      console.log(`Updating metrics for agent ${event.agentId}`)
      // TODO: Logique de mise à jour des métriques
    }
  },
})

const _2 = new Subscription(workflowEvents, "notify-workflow-completion", {
  handler: async (event: WorkflowExecutionEvent) => {
    if (event.status === "completed" || event.status === "failed") {
      console.log(`Workflow ${event.workflowId} ${event.status}`)
      // TODO: Envoyer notifications
    }
  },
})

const _3 = new Subscription(metricsEvents, "aggregate-metrics", {
  handler: async (event: MetricsEvent) => {
    console.log(`Aggregating metrics for project ${event.projectId}`)
    // TODO: Agréger les métriques pour dashboard
  },
})

// Helpers pour publier des événements
export async function publishAgentEvent(event: AgentExecutionEvent) {
  await agentEvents.publish(event)
}

export async function publishWorkflowEvent(event: WorkflowExecutionEvent) {
  await workflowEvents.publish(event)
}

export async function publishMetricsEvent(event: MetricsEvent) {
  await metricsEvents.publish(event)
}
