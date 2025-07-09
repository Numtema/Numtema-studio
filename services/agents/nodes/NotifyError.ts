import { Node } from "pocketflow"
import { exec, queryRow } from "../../../shared/database"
import type { AgentData } from "./PrepareAgent"
import crypto from "crypto"

export class NotifyError extends Node {
  name = "NotifyError"

  prep(shared: Record<string, any>): {
    agent: AgentData
    error: string
    executionId: string
  } {
    return {
      agent: shared.agentData,
      error: shared.error || "Unknown error",
      executionId: shared.executionId,
    }
  }

  async exec(params: { agent: AgentData; error: string; executionId: string }): Promise<void> {
    const projectId = await this.getProjectId(params.agent.id)
    await exec(
      `INSERT INTO execution_traces (id, agent_id, project_id, execution_id, flow_id, node_name, status, duration_ms, input_data, error_message, timestamp)
       VALUES ($1, $2, $3, $4, 'agent_execution_flow', 'ExecuteAgent', 'error', 0, $5, $6, NOW())`,
      [
        crypto.randomUUID(),
        params.agent.id,
        projectId,
        params.executionId,
        JSON.stringify({ error: params.error }),
        params.error,
      ],
    )

    const userId = await this.getUserId(params.agent.id)
    if (userId) {
      await exec(
        `INSERT INTO notifications (id, user_id, type, title, message, metadata)
         VALUES ($1, $2, 'error', $3, $4, $5)`,
        [
          crypto.randomUUID(),
          userId,
          `Agent ${params.agent.name} Error`,
          `Execution failed: ${params.error}`,
          JSON.stringify({
            agentId: params.agent.id,
            executionId: params.executionId,
            timestamp: new Date().toISOString(),
          }),
        ],
      )
    }

    await this.sendSlackNotification(params.agent, params.error)
    await this.updateErrorMetrics(params.agent.id)
  }

  private async getProjectId(agentId: string): Promise<string> {
    const result = await queryRow<{ project_id: string }>(`SELECT project_id FROM agents WHERE id = $1`, [agentId])
    return result?.project_id || ""
  }

  private async getUserId(agentId: string): Promise<string | null> {
    const result = await queryRow<{ user_id: string }>(`SELECT user_id FROM agents WHERE id = $1`, [agentId])
    return result?.user_id || null
  }

  private async sendSlackNotification(agent: AgentData, error: string): Promise<void> {
    const slackWebhook = agent.projectSettings?.notifications?.slack
    if (!slackWebhook) return
    console.log(`Slack notification: Agent ${agent.name} failed - ${error}`)
  }

  private async updateErrorMetrics(agentId: string): Promise<void> {
    const now = new Date()
    const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours())
    await exec(
      `INSERT INTO agent_metrics (id, agent_id, request_count, error_count, timestamp)
       VALUES ($1, $2, 1, 1, $3)
       ON CONFLICT (agent_id, timestamp) DO UPDATE SET
         request_count = agent_metrics.request_count + 1,
         error_count = agent_metrics.error_count + 1`,
      [crypto.randomUUID(), agentId, hourStart.toISOString()],
    )
  }

  post(): string {
    return "finish"
  }
}
