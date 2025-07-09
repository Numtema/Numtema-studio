import { Node } from "pocketflow"
import { exec, queryRow } from "../../../shared/database"
import type { ExecutionResult } from "./ExecuteAgent"
import type { AgentData } from "./PrepareAgent"
import crypto from "crypto"

export class LogTrace extends Node {
  name = "LogTrace"

  prep(shared: Record<string, any>): {
    agent: AgentData
    result: ExecutionResult
    executionId: string
    traceId: string
    originalInput: string
    userContext?: Record<string, any>
  } {
    return {
      agent: shared.agentData,
      result: shared.executionResult,
      executionId: shared.executionId,
      traceId: shared.traceId,
      originalInput: shared.originalInput,
      userContext: shared.userContext,
    }
  }

  async exec(params: {
    agent: AgentData
    result: ExecutionResult
    executionId: string
    traceId: string
    originalInput: string
    userContext?: Record<string, any>
  }): Promise<void> {
    const projectId = await this.getProjectId(params.agent.id)
    await exec(
      `INSERT INTO execution_traces (id, agent_id, project_id, execution_id, flow_id, node_name, status, duration_ms, input_data, output_data, timestamp)
       VALUES ($1, $2, $3, $4, 'agent_execution_flow', 'ExecuteAgent', 'success', $5, $6, $7, $8)`,
      [
        params.traceId,
        params.agent.id,
        projectId,
        params.executionId,
        params.result.duration,
        JSON.stringify({ input: params.originalInput, context: params.userContext }),
        JSON.stringify({ content: params.result.content, usage: params.result.usage, model: params.result.model }),
        params.result.timestamp,
      ],
    )
    await this.updateAgentMetrics(params.agent.id, params.result)
  }

  private async getProjectId(agentId: string): Promise<string> {
    const result = await queryRow<{ project_id: string }>(`SELECT project_id FROM agents WHERE id = $1`, [agentId])
    return result?.project_id || ""
  }

  private async updateAgentMetrics(agentId: string, result: ExecutionResult): Promise<void> {
    const now = new Date()
    const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours())
    await exec(
      `INSERT INTO agent_metrics (id, agent_id, request_count, success_count, avg_response_time, timestamp)
       VALUES ($1, $2, 1, 1, $3, $4)
       ON CONFLICT (agent_id, timestamp) DO UPDATE SET
         request_count = agent_metrics.request_count + 1,
         success_count = agent_metrics.success_count + 1,
         avg_response_time = (agent_metrics.avg_response_time * agent_metrics.request_count + $3) / (agent_metrics.request_count + 1)`,
      [crypto.randomUUID(), agentId, result.duration, hourStart.toISOString()],
    )
  }

  post(): string {
    return "finish"
  }
}
