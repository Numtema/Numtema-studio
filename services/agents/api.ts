import { api, APIError } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import crypto from "crypto"
import { query, queryRow, exec } from "../../shared/database"
import type {
  Agent,
  CreateAgentParams,
  UpdateAgentParams,
  ExecuteAgentParams,
  ExecuteAgentResponse,
  ListAgentsParams,
} from "./types"
import { executeAgentFlow } from "./flow"

// Helper pour mapper les noms de colonnes DB vers les noms de propriétés de l'objet
const mapDbAgentToAgent = (dbAgent: any): Agent => ({
  id: dbAgent.id,
  name: dbAgent.name,
  description: dbAgent.description,
  model: dbAgent.model,
  systemPrompt: dbAgent.system_prompt,
  temperature: Number.parseFloat(dbAgent.temperature),
  maxTokens: dbAgent.max_tokens,
  tools: dbAgent.tools,
  memoryConfig: dbAgent.memory_config,
  userId: dbAgent.user_id,
  projectId: dbAgent.project_id,
  status: dbAgent.status,
  createdAt: dbAgent.created_at,
  updatedAt: dbAgent.updated_at,
})

// Créer un agent
export const create = api<CreateAgentParams, { agent: Agent }>(
  { expose: true, method: "POST", path: "/agents", auth: true },
  async (params): Promise<{ agent: Agent }> => {
    const { userId } = getAuthData()!

    const project = await queryRow<{ id: string }>(`SELECT id FROM projects WHERE id = $1 AND user_id = $2`, [
      params.projectId,
      userId,
    ])

    if (!project) {
      throw APIError.notFound("Project not found or access denied")
    }

    const agentId = crypto.randomUUID()
    const now = new Date().toISOString()

    await exec(
      `INSERT INTO agents (
        id, name, description, model, system_prompt, temperature, max_tokens,
        tools, memory_config, user_id, project_id, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        agentId,
        params.name,
        params.description || null,
        params.model,
        params.systemPrompt || null,
        params.temperature || 0.7,
        params.maxTokens || 1000,
        JSON.stringify(params.tools || {}),
        JSON.stringify(params.memoryConfig || {}),
        userId,
        params.projectId,
        "active",
        now,
        now,
      ],
    )

    const agent = await queryRow<any>(`SELECT * FROM agents WHERE id = $1`, [agentId])
    if (!agent) throw APIError.internal("Failed to create agent")

    return { agent: mapDbAgentToAgent(agent) }
  },
)

// Lister les agents
export const list = api<ListAgentsParams, { agents: Agent[] }>(
  { expose: true, method: "GET", path: "/agents", auth: true },
  async (params): Promise<{ agents: Agent[] }> => {
    const { userId } = getAuthData()!

    let sql = `SELECT * FROM agents WHERE user_id = $1`
    const queryParams: any[] = [userId]

    if (params.projectId) {
      sql += ` AND project_id = $${queryParams.length + 1}`
      queryParams.push(params.projectId)
    }

    sql += ` ORDER BY created_at DESC`

    if (params.limit) {
      sql += ` LIMIT $${queryParams.length + 1}`
      queryParams.push(params.limit)
    }

    if (params.offset) {
      sql += ` OFFSET $${queryParams.length + 1}`
      queryParams.push(params.offset)
    }

    const agents = await query<any>(sql, queryParams)
    return { agents: agents.map(mapDbAgentToAgent) }
  },
)

// Récupérer un agent
export const get = api<{ agentId: string }, { agent: Agent }>(
  { expose: true, method: "GET", path: "/agents/:agentId", auth: true },
  async ({ agentId }): Promise<{ agent: Agent }> => {
    const { userId } = getAuthData()!

    const agent = await queryRow<any>(`SELECT * FROM agents WHERE id = $1 AND user_id = $2`, [agentId, userId])

    if (!agent) throw APIError.notFound("Agent not found")

    return { agent: mapDbAgentToAgent(agent) }
  },
)

// Mettre à jour un agent
export const update = api<{ agentId: string } & UpdateAgentParams, { agent: Agent }>(
  { expose: true, method: "PUT", path: "/agents/:agentId", auth: true },
  async ({ agentId, ...params }): Promise<{ agent: Agent }> => {
    const { userId } = getAuthData()!

    const existingAgent = await queryRow<{ id: string }>(`SELECT id FROM agents WHERE id = $1 AND user_id = $2`, [
      agentId,
      userId,
    ])

    if (!existingAgent) throw APIError.notFound("Agent not found")

    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    const addUpdate = (key: string, value: any, isJson = false) => {
      if (value !== undefined) {
        updates.push(`${key} = $${paramIndex++}`)
        values.push(isJson ? JSON.stringify(value) : value)
      }
    }

    addUpdate("name", params.name)
    addUpdate("description", params.description)
    addUpdate("model", params.model)
    addUpdate("system_prompt", params.systemPrompt)
    addUpdate("temperature", params.temperature)
    addUpdate("max_tokens", params.maxTokens)
    addUpdate("tools", params.tools, true)
    addUpdate("memory_config", params.memoryConfig, true)

    if (updates.length === 0) {
      const currentAgent = await get({ agentId })
      return { agent: currentAgent.agent }
    }

    updates.push(`updated_at = NOW()`)
    values.push(agentId)

    await exec(`UPDATE agents SET ${updates.join(", ")} WHERE id = $${paramIndex}`, values)

    const updatedAgent = await queryRow<any>(`SELECT * FROM agents WHERE id = $1`, [agentId])
    return { agent: mapDbAgentToAgent(updatedAgent) }
  },
)

// Supprimer un agent
export const del = api<{ agentId: string }, { success: boolean }>(
  { expose: true, method: "DELETE", path: "/agents/:agentId", auth: true },
  async ({ agentId }): Promise<{ success: boolean }> => {
    const { userId } = getAuthData()!

    await exec(`DELETE FROM agents WHERE id = $1 AND user_id = $2`, [agentId, userId])

    return { success: true }
  },
)

// Exécuter un agent (version basique)
export const execute = api<{ agentId: string } & ExecuteAgentParams, ExecuteAgentResponse>(
  { expose: true, method: "POST", path: "/agents/:agentId/execute", auth: true },
  async ({ agentId, ...params }): Promise<ExecuteAgentResponse> => {
    const { userId } = getAuthData()!

    const agent = await queryRow<{ project_id: string }>(
      `SELECT project_id FROM agents WHERE id = $1 AND user_id = $2`,
      [agentId, userId],
    )

    if (!agent) {
      throw APIError.notFound("Agent not found")
    }

    const startTime = Date.now()

    try {
      const result = await executeAgentFlow(agentId, params.input, params.context)

      const duration = Date.now() - startTime

      if (result.success) {
        return {
          executionId: result.executionId,
          result: result.result.content,
          status: "success",
          traceId: result.traceId,
          duration,
        }
      } else {
        return {
          executionId: result.executionId,
          status: "error",
          error: result.error,
          traceId: result.traceId,
          duration,
        }
      }
    } catch (error: any) {
      return {
        executionId: crypto.randomUUID(),
        status: "error",
        error: error.message,
        traceId: crypto.randomUUID(),
        duration: Date.now() - startTime,
      }
    }
  },
)
