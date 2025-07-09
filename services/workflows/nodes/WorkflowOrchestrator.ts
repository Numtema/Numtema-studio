import { Node } from "pocketflow"
import { query, queryRow, exec } from "../../../shared/database"
import crypto from "crypto"

export interface WorkflowContext {
  workflowId: string
  inputData: any
  context?: Record<string, any>
}

export interface WorkflowData {
  workflow: any
  steps: any[]
  execution: any
}

export class WorkflowOrchestrator extends Node {
  name = "WorkflowOrchestrator"

  prep(shared: Record<string, any>): WorkflowContext {
    return {
      workflowId: shared.workflowId,
      inputData: shared.inputData,
      context: shared.context,
    }
  }

  async exec(context: WorkflowContext): Promise<WorkflowData> {
    // Récupérer le workflow et ses étapes
    const workflow = await queryRow<any>(`SELECT * FROM workflows WHERE id = $1 AND status = 'active'`, [
      context.workflowId,
    ])

    if (!workflow) {
      throw new Error(`Workflow ${context.workflowId} not found or inactive`)
    }

    const steps = await query<any>(
      `SELECT ws.*, a.name as agent_name, a.model
       FROM workflow_steps ws
       JOIN agents a ON ws.agent_id = a.id
       WHERE ws.workflow_id = $1
       ORDER BY ws.step_order`,
      [context.workflowId],
    )

    // Créer l'exécution de workflow
    const executionId = crypto.randomUUID()
    await exec(
      `INSERT INTO workflow_executions (id, workflow_id, status, input_data, started_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [executionId, context.workflowId, "running", JSON.stringify(context.inputData)],
    )

    const execution = await queryRow<any>(`SELECT * FROM workflow_executions WHERE id = $1`, [executionId])

    return {
      workflow,
      steps,
      execution,
    }
  }

  post(shared: Record<string, any>, prepRes: WorkflowContext, execRes: WorkflowData): string {
    shared.workflowData = execRes
    shared.executionId = execRes.execution.id
    shared.currentStepIndex = 0
    shared.stepResults = []
    shared.globalContext = { ...prepRes.context, ...prepRes.inputData }

    // Décider si exécution parallèle ou séquentielle
    if (execRes.workflow.config?.parallel) {
      return "parallel"
    } else {
      return "sequential"
    }
  }
}
