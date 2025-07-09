import { Node } from "pocketflow"
import { exec } from "../../../shared/database"

export class CompleteWorkflow extends Node {
  name = "CompleteWorkflow"

  prep(shared: Record<string, any>): {
    executionId: string
    stepResults: any[]
    workflow: any
  } {
    return {
      executionId: shared.executionId,
      stepResults: shared.stepResults,
      workflow: shared.workflowData.workflow,
    }
  }

  async exec(params: {
    executionId: string
    stepResults: any[]
    workflow: any
  }): Promise<any> {
    const { executionId, stepResults, workflow } = params

    // Construire le résultat final
    const outputData = {
      totalSteps: stepResults.length,
      completedSteps: stepResults.filter((r) => r.status === "completed").length,
      failedSteps: stepResults.filter((r) => r.status === "failed").length,
      skippedSteps: stepResults.filter((r) => r.status === "skipped").length,
      results: stepResults.reduce(
        (acc, step) => {
          acc[step.stepName] = step.result
          return acc
        },
        {} as Record<string, any>,
      ),
    }

    // Déterminer le statut final
    const hasFailures = stepResults.some((r) => r.status === "failed")
    const finalStatus = hasFailures ? "failed" : "completed"

    // Mettre à jour l'exécution de workflow
    await exec(
      `UPDATE workflow_executions 
       SET status = $1, output_data = $2, completed_at = NOW(),
           duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
       WHERE id = $3`,
      [finalStatus, JSON.stringify(outputData), executionId],
    )

    // Envoyer notifications si configuré
    if (workflow.config?.notifications) {
      await this.sendNotifications(workflow, finalStatus, { ...outputData, executionId })
    }

    return {
      status: finalStatus,
      outputData,
      executionId,
    }
  }

  private async sendNotifications(workflow: any, status: string, outputData: any): Promise<void> {
    const config = workflow.config.notifications

    if ((status === "completed" && config.onSuccess) || (status === "failed" && config.onFailure)) {
      // Créer notification utilisateur
      await exec(
        `INSERT INTO notifications (id, user_id, type, title, message, metadata)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`,
        [
          workflow.user_id,
          status === "completed" ? "success" : "error",
          `Workflow ${workflow.name} ${status}`,
          `Workflow execution ${status} with ${outputData.completedSteps}/${outputData.totalSteps} steps completed`,
          JSON.stringify({
            workflowId: workflow.id,
            executionId: outputData.executionId,
            outputData,
          }),
        ],
      )
    }
  }

  post(shared: Record<string, any>, prepRes: any, execRes: any): string {
    shared.finalResult = execRes
    return "finish"
  }
}
