import { api } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { query, queryRow, exec } from "../../shared/database"
import type { ExecutionTrace, AgentMetrics, GetTracesParams, GetMetricsParams, SystemHealth } from "./types"
import { getCurrentTimestamp } from "../../shared/utils"

// Mock data
const mockTraces: ExecutionTrace[] = [
  {
    id: "trace_1",
    agentId: "agent_1",
    projectId: "proj_1",
    flowId: "agent_execution_flow",
    nodeName: "ExecuteAgent",
    status: "success",
    durationMs: 1250,
    inputData: { input: "Create a blog post about AI" },
    outputData: { output: "Here's your AI blog post..." },
    timestamp: getCurrentTimestamp(),
  },
  {
    id: "trace_2",
    agentId: "agent_2",
    projectId: "proj_1",
    flowId: "agent_execution_flow",
    nodeName: "ExecuteAgent",
    status: "error",
    durationMs: 5000,
    inputData: { input: "Review this code" },
    outputData: {},
    errorMessage: "LLM API timeout",
    timestamp: getCurrentTimestamp(),
  },
]

const mockMetrics: AgentMetrics[] = [
  {
    id: "metric_1",
    agentId: "agent_1",
    cpuUsage: 15.5,
    memoryUsage: 42.3,
    requestCount: 25,
    errorCount: 1,
    avgResponseTime: 1200,
    timestamp: getCurrentTimestamp(),
  },
]

const mapDbTraceToTrace = (t: any): ExecutionTrace => ({
  id: t.id,
  agentId: t.agent_id,
  projectId: t.project_id,
  executionId: t.execution_id,
  flowId: t.flow_id,
  nodeName: t.node_name,
  status: t.status,
  durationMs: t.duration_ms,
  inputData: t.input_data,
  outputData: t.output_data,
  errorMessage: t.error_message,
  timestamp: t.timestamp,
})

const mapDbMetricsToMetrics = (m: any): AgentMetrics => ({
  id: m.id,
  agentId: m.agent_id,
  cpuUsage: m.cpu_usage,
  memoryUsage: m.memory_usage,
  requestCount: m.request_count,
  errorCount: m.error_count,
  successCount: m.success_count,
  avgResponseTime: m.avg_response_time,
  timestamp: m.timestamp,
})

export const getTraces = api<GetTracesParams, { traces: ExecutionTrace[] }>(
  { expose: true, method: "GET", path: "/traces", auth: true },
  async (params): Promise<{ traces: ExecutionTrace[] }> => {
    const { userId } = getAuthData()!
    let sql = `SELECT t.* FROM execution_traces t JOIN agents a ON t.agent_id = a.id WHERE a.user_id = $1`
    const queryParams: any[] = [userId]
    let paramIndex = 2

    if (params.agentId) {
      sql += ` AND t.agent_id = $${paramIndex++}`
      queryParams.push(params.agentId)
    }

    if (params.status) {
      sql += ` AND t.status = $${paramIndex++}`
      queryParams.push(params.status)
    }

    sql += ` ORDER BY t.timestamp DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
    queryParams.push(params.limit || 50, params.offset || 0)

    const traces = await query<any>(sql, queryParams)
    return { traces: traces.map(mapDbTraceToTrace) }
  },
)

export const getMetrics = api<GetMetricsParams, { metrics: AgentMetrics[] }>(
  { expose: true, method: "GET", path: "/metrics", auth: true },
  async (params): Promise<{ metrics: AgentMetrics[] }> => {
    const { userId } = getAuthData()!
    const timeFilter = params.timeframe || "24h"
    const intervalMapping = { "1h": "1 hour", "24h": "24 hours", "7d": "7 days", "30d": "30 days" }
    let sql = `SELECT m.* FROM agent_metrics m JOIN agents a ON m.agent_id = a.id WHERE a.user_id = $1 AND m.timestamp >= NOW() - INTERVAL '${intervalMapping[timeFilter]}'`
    const queryParams: any[] = [userId]
    sql += ` ORDER BY m.timestamp DESC`

    const metrics = await query<any>(sql, queryParams)
    return { metrics: metrics.map(mapDbMetricsToMetrics) }
  },
)

export const getSystemHealth = api<{}, { health: SystemHealth }>(
  { expose: true, method: "GET", path: "/health" },
  async (): Promise<{ health: SystemHealth }> => {
    const startTime = Date.now()
    try {
      await queryRow(`SELECT 1`)
      const dbHealthy = true
      const llmHealthy = true // Simulation
      const memoryUsage = Math.random() * 80
      const responseTime = Date.now() - startTime
      const allHealthy = dbHealthy && llmHealthy && memoryUsage < 90 && responseTime < 1000

      return {
        health: {
          status: allHealthy ? "healthy" : "degraded",
          timestamp: new Date().toISOString(),
          checks: { database: dbHealthy, llmProviders: llmHealthy, memoryUsage, responseTime },
        },
      }
    } catch (error) {
      return {
        health: {
          status: "down",
          timestamp: new Date().toISOString(),
          checks: { database: false, llmProviders: false, memoryUsage: 0, responseTime: Date.now() - startTime },
        },
      }
    }
  },
)

export const getNotifications = api<{ limit?: number; unreadOnly?: boolean }, { notifications: any[] }>(
  { expose: true, method: "GET", path: "/notifications", auth: true },
  async (params): Promise<{ notifications: any[] }> => {
    const { userId } = getAuthData()!
    let sql = `SELECT * FROM notifications WHERE user_id = $1`
    const queryParams: any[] = [userId]
    if (params.unreadOnly) sql += ` AND read = false`
    sql += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1}`
    queryParams.push(params.limit || 10)

    const notifications = await query<any>(sql, queryParams)
    return { notifications }
  },
)

export const markNotificationRead = api<{ notificationId: string }, { success: boolean }>(
  { expose: true, method: "PUT", path: "/notifications/:notificationId/read", auth: true },
  async ({ notificationId }): Promise<{ success: boolean }> => {
    const { userId } = getAuthData()!
    await exec(`UPDATE notifications SET read = true WHERE id = $1 AND user_id = $2`, [notificationId, userId])
    return { success: true }
  },
)
