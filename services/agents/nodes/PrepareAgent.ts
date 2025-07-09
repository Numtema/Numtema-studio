import { Node } from "pocketflow"
import { queryRow } from "../../../shared/database"

export interface AgentContext {
  agentId: string
  input: string
  userContext?: Record<string, any>
}

export interface AgentData {
  id: string
  name: string
  model: string
  systemPrompt?: string
  temperature: number
  maxTokens: number
  tools: any
  memoryConfig: any
  projectSettings: any
}

export class PrepareAgent extends Node {
  name = "PrepareAgent"

  prep(shared: Record<string, any>): AgentContext {
    return {
      agentId: shared.agentId,
      input: shared.input,
      userContext: shared.context,
    }
  }

  async exec(context: AgentContext): Promise<AgentData> {
    const agentData = await queryRow<any>(
      `SELECT a.*, p.settings as project_settings
       FROM agents a JOIN projects p ON a.project_id = p.id
       WHERE a.id = $1 AND a.status = 'active'`,
      [context.agentId],
    )

    if (!agentData) {
      throw new Error(`Agent ${context.agentId} not found or inactive`)
    }

    return {
      id: agentData.id,
      name: agentData.name,
      model: agentData.model,
      systemPrompt: agentData.system_prompt,
      temperature: agentData.temperature,
      maxTokens: agentData.max_tokens,
      tools: agentData.tools,
      memoryConfig: agentData.memory_config,
      projectSettings: agentData.project_settings,
    }
  }

  post(shared: Record<string, any>, prepRes: AgentContext, execRes: AgentData): string {
    shared.agentData = execRes
    shared.originalInput = prepRes.input
    shared.userContext = prepRes.userContext
    return "default"
  }
}
