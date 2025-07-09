import { getAuthData } from "~encore/auth"
import { query, queryRow, exec } from "../../shared/database"
import { executeAgentFlow } from "../agents/flow"
import { executeWorkflowFlow } from "../workflows/flow"
import { analyticsEngine } from "../analytics/engine"
import crypto from "crypto"

export const resolvers = {
  Query: {
    // User queries
    me: async (_: any, __: any, context: any) => {
      const { userId } = getAuthData(context.req)!
      const user = await queryRow<any>(`SELECT * FROM users WHERE id = $1`, [userId])
      return user
    },

    // Project queries
    projects: async (_: any, __: any, context: any) => {
      const { userId } = getAuthData(context.req)!
      const projects = await query<any>(
        `SELECT p.*, COUNT(a.id) as agent_count
         FROM projects p
         LEFT JOIN agents a ON p.id = a.project_id
         WHERE p.user_id = $1
         GROUP BY p.id
         ORDER BY p.created_at DESC`,
        [userId],
      )
      return projects
    },

    project: async (_: any, { id }: { id: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const project = await queryRow<any>(`SELECT * FROM projects WHERE id = $1 AND user_id = $2`, [id, userId])
      return project
    },

    // Agent queries
    agents: async (_: any, { projectId }: { projectId?: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      let sql = `SELECT * FROM agents WHERE user_id = $1`
      const params = [userId]

      if (projectId) {
        sql += ` AND project_id = $2`
        params.push(projectId)
      }

      sql += ` ORDER BY created_at DESC`

      const agents = await query<any>(sql, params)
      return agents
    },

    agent: async (_: any, { id }: { id: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const agent = await queryRow<any>(`SELECT * FROM agents WHERE id = $1 AND user_id = $2`, [id, userId])
      return agent
    },

    // Workflow queries
    workflows: async (_: any, { projectId }: { projectId?: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      let sql = `SELECT * FROM workflows WHERE user_id = $1`
      const params = [userId]

      if (projectId) {
        sql += ` AND project_id = $2`
        params.push(projectId)
      }

      sql += ` ORDER BY created_at DESC`

      const workflows = await query<any>(sql, params)
      return workflows
    },

    // Analytics queries
    dashboard: async (_: any, { timeframe }: { timeframe: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const timeframeMap: { [key: string]: string } = {
        HOUR: "1h",
        DAY: "24h",
        WEEK: "7d",
        MONTH: "30d",
        QUARTER: "90d",
      }

      return await analyticsEngine.getDashboardMetrics(userId, timeframeMap[timeframe] || "24h")
    },

    agentAnalytics: async (_: any, { agentId, timeframe }: { agentId: string; timeframe: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const timeframeMap: { [key: string]: string } = {
        HOUR: "1h",
        DAY: "24h",
        WEEK: "7d",
        MONTH: "30d",
        QUARTER: "90d",
      }

      return await analyticsEngine.getAgentAnalytics(agentId, userId, {
        timeframe: timeframeMap[timeframe] || "24h",
        includeTimeSeries: true,
      })
    },

    // System queries
    health: async () => {
      return await analyticsEngine.getRealtimeMetrics()
    },

    realtimeMetrics: async () => {
      return await analyticsEngine.getRealtimeMetrics()
    },
  },

  Mutation: {
    // Project mutations
    createProject: async (_: any, { input }: { input: any }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const projectId = crypto.randomUUID()

      await exec(
        `INSERT INTO projects (id, name, description, user_id, settings)
         VALUES ($1, $2, $3, $4, $5)`,
        [projectId, input.name, input.description || null, userId, JSON.stringify(input.settings || {})],
      )

      return await queryRow<any>(`SELECT * FROM projects WHERE id = $1`, [projectId])
    },

    // Agent mutations
    createAgent: async (_: any, { input }: { input: any }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const agentId = crypto.randomUUID()

      await exec(
        `INSERT INTO agents (
          id, name, description, model, system_prompt, temperature, max_tokens,
          tools, memory_config, user_id, project_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          agentId,
          input.name,
          input.description || null,
          input.model,
          input.systemPrompt || null,
          input.temperature || 0.7,
          input.maxTokens || 1000,
          JSON.stringify(input.tools || {}),
          JSON.stringify(input.memoryConfig || {}),
          userId,
          input.projectId,
        ],
      )

      return await queryRow<any>(`SELECT * FROM agents WHERE id = $1`, [agentId])
    },

    executeAgent: async (_: any, { input }: { input: any }, context: any) => {
      const { userId } = getAuthData(context.req)!

      // Vérifier que l'agent appartient à l'utilisateur
      const agent = await queryRow<any>(`SELECT * FROM agents WHERE id = $1 AND user_id = $2`, [input.agentId, userId])

      if (!agent) {
        throw new Error("Agent not found")
      }

      const result = await executeAgentFlow(input.agentId, input.input, input.context)

      // Retourner l'exécution depuis la base
      const execution = await queryRow<any>(`SELECT * FROM execution_traces WHERE id = $1`, [result.traceId])

      return execution
    },

    // Workflow mutations
    executeWorkflow: async (_: any, { input }: { input: any }, context: any) => {
      const { userId } = getAuthData(context.req)!

      // Vérifier que le workflow appartient à l'utilisateur
      const workflow = await queryRow<any>(`SELECT * FROM workflows WHERE id = $1 AND user_id = $2`, [
        input.workflowId,
        userId,
      ])

      if (!workflow) {
        throw new Error("Workflow not found")
      }

      const result = await executeWorkflowFlow(input.workflowId, input.inputData, input.context)

      // Retourner l'exécution depuis la base
      const execution = await queryRow<any>(`SELECT * FROM workflow_executions WHERE id = $1`, [result.executionId])

      return execution
    },
  },

  // Field resolvers
  Project: {
    agents: async (project: any) => {
      return await query<any>(`SELECT * FROM agents WHERE project_id = $1 ORDER BY created_at DESC`, [project.id])
    },

    stats: async (project: any, _: any, context: any) => {
      const { userId } = getAuthData(context.req)!
      return await analyticsEngine.getProjectAnalytics(project.id, userId, { timeframe: "24h" })
    },
  },

  Agent: {
    executions: async (agent: any, { limit }: { limit: number }) => {
      return await query<any>(
        `SELECT * FROM execution_traces 
         WHERE agent_id = $1 
         ORDER BY timestamp DESC 
         LIMIT $2`,
        [agent.id, limit],
      )
    },

    analytics: async (agent: any, { timeframe }: { timeframe: string }, context: any) => {
      const { userId } = getAuthData(context.req)!
      const timeframeMap: { [key: string]: string } = {
        HOUR: "1h",
        DAY: "24h",
        WEEK: "7d",
        MONTH: "30d",
        QUARTER: "90d",
      }

      return await analyticsEngine.getAgentAnalytics(agent.id, userId, {
        timeframe: timeframeMap[timeframe] || "24h",
        includeTimeSeries: true,
      })
    },
  },

  Workflow: {
    steps: async (workflow: any) => {
      return await query<any>(
        `SELECT * FROM workflow_steps 
         WHERE workflow_id = $1 
         ORDER BY step_order`,
        [workflow.id],
      )
    },

    executions: async (workflow: any, { limit }: { limit: number }) => {
      return await query<any>(
        `SELECT * FROM workflow_executions 
         WHERE workflow_id = $1 
         ORDER BY started_at DESC 
         LIMIT $2`,
        [workflow.id, limit],
      )
    },
  },

  WorkflowStep: {
    agent: async (step: any) => {
      return await queryRow<any>(`SELECT * FROM agents WHERE id = $1`, [step.agent_id])
    },
  },

  WorkflowExecution: {
    stepExecutions: async (execution: any) => {
      return await query<any>(
        `SELECT * FROM step_executions 
         WHERE workflow_execution_id = $1 
         ORDER BY started_at`,
        [execution.id],
      )
    },
  },

  StepExecution: {
    step: async (stepExecution: any) => {
      return await queryRow<any>(`SELECT * FROM workflow_steps WHERE id = $1`, [stepExecution.workflow_step_id])
    },
  },
}
