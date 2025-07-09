import { api, APIError } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import crypto from "crypto"
import { query, queryRow, exec } from "../../shared/database"
import type { Project, CreateProjectParams, UpdateProjectParams, ProjectStats } from "./types"

const mapDbProjectToProject = (p: any): Project => ({
  id: p.id,
  name: p.name,
  description: p.description,
  userId: p.user_id,
  settings: p.settings,
  status: p.status,
  agentCount: Number.parseInt(p.agent_count, 10) || 0,
  createdAt: p.created_at,
  updatedAt: p.updated_at,
})

export const create = api<CreateProjectParams, { project: Project }>(
  { expose: true, method: "POST", path: "/projects", auth: true },
  async (params): Promise<{ project: Project }> => {
    const { userId } = getAuthData()!
    const projectId = crypto.randomUUID()
    const now = new Date().toISOString()
    const defaultSettings = {
      maxAgents: 10,
      defaultModel: "gpt-4o",
      retryPolicy: { maxRetries: 3, waitTime: 2000 },
      notifications: { email: true },
      ...params.settings,
    }

    await exec(
      `INSERT INTO projects (id, name, description, user_id, settings, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'active', $6, $7)`,
      [projectId, params.name, params.description || null, userId, JSON.stringify(defaultSettings), now, now],
    )

    const project = await queryRow<any>(
      `SELECT p.*, COUNT(a.id) as agent_count
       FROM projects p LEFT JOIN agents a ON p.id = a.project_id
       WHERE p.id = $1 GROUP BY p.id`,
      [projectId],
    )

    return { project: mapDbProjectToProject(project) }
  },
)

export const list = api<{}, { projects: Project[] }>(
  { expose: true, method: "GET", path: "/projects", auth: true },
  async (): Promise<{ projects: Project[] }> => {
    const { userId } = getAuthData()!
    const projects = await query<any>(
      `SELECT p.*, COUNT(a.id) as agent_count
       FROM projects p LEFT JOIN agents a ON p.id = a.project_id
       WHERE p.user_id = $1 GROUP BY p.id ORDER BY p.created_at DESC`,
      [userId],
    )
    return { projects: projects.map(mapDbProjectToProject) }
  },
)

export const get = api<{ projectId: string }, { project: Project }>(
  { expose: true, method: "GET", path: "/projects/:projectId", auth: true },
  async ({ projectId }): Promise<{ project: Project }> => {
    const { userId } = getAuthData()!
    const project = await queryRow<any>(
      `SELECT p.*, COUNT(a.id) as agent_count
       FROM projects p LEFT JOIN agents a ON p.id = a.project_id
       WHERE p.id = $1 AND p.user_id = $2 GROUP BY p.id`,
      [projectId, userId],
    )
    if (!project) throw APIError.notFound("Project not found")
    return { project: mapDbProjectToProject(project) }
  },
)

export const update = api<{ projectId: string } & UpdateProjectParams, { project: Project }>(
  { expose: true, method: "PUT", path: "/projects/:projectId", auth: true },
  async ({ projectId, ...params }): Promise<{ project: Project }> => {
    const { userId } = getAuthData()!
    const existing = await queryRow<{ settings: any }>(`SELECT settings FROM projects WHERE id = $1 AND user_id = $2`, [
      projectId,
      userId,
    ])
    if (!existing) throw APIError.notFound("Project not found")

    const updatedSettings = { ...existing.settings, ...params.settings }
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (params.name !== undefined) {
      updates.push(`name = $${paramIndex++}`)
      values.push(params.name)
    }
    if (params.description !== undefined) {
      updates.push(`description = $${paramIndex++}`)
      values.push(params.description)
    }
    if (params.settings !== undefined) {
      updates.push(`settings = $${paramIndex++}`)
      values.push(JSON.stringify(updatedSettings))
    }
    updates.push(`updated_at = NOW()`)
    values.push(projectId)

    await exec(`UPDATE projects SET ${updates.join(", ")} WHERE id = $${paramIndex}`, values)

    const project = await queryRow<any>(
      `SELECT p.*, COUNT(a.id) as agent_count
       FROM projects p LEFT JOIN agents a ON p.id = a.project_id
       WHERE p.id = $1 GROUP BY p.id`,
      [projectId],
    )
    return { project: mapDbProjectToProject(project) }
  },
)

export const getStats = api<{ projectId: string }, { stats: ProjectStats }>(
  { expose: true, method: "GET", path: "/projects/:projectId/stats", auth: true },
  async ({ projectId }): Promise<{ stats: ProjectStats }> => {
    const { userId } = getAuthData()!
    const project = await queryRow<{ id: string }>(`SELECT id FROM projects WHERE id = $1 AND user_id = $2`, [
      projectId,
      userId,
    ])
    if (!project) throw APIError.notFound("Project not found")

    const execStats = await queryRow<any>(
      `SELECT COUNT(*) as total_executions,
              COUNT(CASE WHEN status = 'success' THEN 1 END) as success_count,
              COUNT(CASE WHEN status = 'error' THEN 1 END) as error_count,
              AVG(duration_ms) as avg_response_time
       FROM execution_traces WHERE project_id = $1 AND timestamp >= NOW() - INTERVAL '30 days'`,
      [projectId],
    )

    const agentCount = await queryRow<{ count: string }>(
      `SELECT COUNT(*) as count FROM agents WHERE project_id = $1 AND status = 'active'`,
      [projectId],
    )

    const totalExecutions = Number.parseInt(execStats.total_executions, 10) || 0
    const successCount = Number.parseInt(execStats.success_count, 10) || 0

    return {
      stats: {
        totalExecutions,
        successRate: totalExecutions > 0 ? (successCount / totalExecutions) * 100 : 0,
        avgResponseTime: Number.parseFloat(execStats.avg_response_time) || 0,
        totalErrors: Number.parseInt(execStats.error_count, 10) || 0,
        activeAgents: Number.parseInt(agentCount?.count || "0", 10),
      },
    }
  },
)

export const del = api<{ projectId: string }, { success: boolean }>(
  { expose: true, method: "DELETE", path: "/projects/:projectId", auth: true },
  async ({ projectId }): Promise<{ success: boolean }> => {
    const { userId } = getAuthData()!
    const agentCount = await queryRow<{ count: string }>(`SELECT COUNT(*) as count FROM agents WHERE project_id = $1`, [
      projectId,
    ])
    if (agentCount && Number.parseInt(agentCount.count, 10) > 0) {
      throw APIError.invalidArgument("Cannot delete project with active agents")
    }
    await exec(`DELETE FROM projects WHERE id = $1 AND user_id = $2`, [projectId, userId])
    return { success: true }
  },
)
