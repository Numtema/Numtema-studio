import { Node } from "pocketflow"
import { exec } from "../../../shared/database"
import { executeAgentFlow } from "../../agents/flow"
import crypto from "crypto"

export class ExecuteStep extends Node {
  name = "ExecuteStep"

  prep(shared: Record<string, any>): {
    step: any
    executionId: string
    globalContext: any
    previousResults: any[]
  } {
    const steps = shared.workflowData.steps
    const currentIndex = shared.currentStepIndex

    return {
      step: steps[currentIndex],
      executionId: shared.executionId,
      globalContext: shared.globalContext,
      previousResults: shared.stepResults,
    }
  }

  async exec(params: {
    step: any
    executionId: string
    globalContext: any
    previousResults: any[]
  }): Promise<any> {
    const { step, executionId, globalContext, previousResults } = params

    // Créer l'exécution d'étape
    const stepExecutionId = crypto.randomUUID()
    await exec(
      `INSERT INTO step_executions (
        id, workflow_execution_id, workflow_step_id, agent_id, 
        status, started_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())`,
      [stepExecutionId, executionId, step.id, step.agent_id, "running"],
    )

    try {
      // Évaluer la condition d'exécution si définie
      if (step.config?.condition) {
        const shouldExecute = this.evaluateCondition(step.config.condition, globalContext, previousResults)

        if (!shouldExecute) {
          await exec(
            `UPDATE step_executions 
             SET status = 'skipped', completed_at = NOW()
             WHERE id = $1`,
            [stepExecutionId],
          )

          return {
            stepExecutionId,
            status: "skipped",
            result: null,
          }
        }
      }

      // Préparer l'input pour l'agent
      const agentInput = this.prepareAgentInput(step.config?.input || "", globalContext, previousResults)

      const agentContext = {
        ...globalContext,
        stepName: step.name,
        stepOrder: step.step_order,
        workflowExecutionId: executionId,
      }

      // Exécuter l'agent
      const agentResult = await executeAgentFlow(step.agent_id, agentInput, agentContext)

      if (agentResult.success) {
        // Mettre à jour l'exécution d'étape
        await exec(
          `UPDATE step_executions 
           SET status = 'completed', output_data = $1, completed_at = NOW(),
               duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
           WHERE id = $2`,
          [JSON.stringify(agentResult.result), stepExecutionId],
        )

        return {
          stepExecutionId,
          status: "completed",
          result: agentResult.result,
          agentResult,
        }
      } else {
        throw new Error(agentResult.error || "Agent execution failed")
      }
    } catch (error: any) {
      // Marquer l'étape comme échouée
      await exec(
        `UPDATE step_executions 
         SET status = 'failed', error_message = $1, completed_at = NOW(),
             duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000
         WHERE id = $2`,
        [error.message, stepExecutionId],
      )

      throw error
    }
  }

  private evaluateCondition(condition: string, globalContext: any, previousResults: any[]): boolean {
    try {
      // Sécurité basique : seules certaines expressions sont autorisées
      const allowedPattern = /^[a-zA-Z0-9_.[\]'"=<>!&|\s]+$/
      if (!allowedPattern.test(condition)) {
        throw new Error("Invalid condition expression")
      }

      // Créer un contexte d'évaluation sécurisé
      const evalContext = {
        context: globalContext,
        results: previousResults,
        // Helpers utiles
        hasResult: (stepName: string) => previousResults.some((r) => r.stepName === stepName),
        getResult: (stepName: string) => previousResults.find((r) => r.stepName === stepName)?.result,
      }

      // Évaluation sécurisée (attention: eval peut être dangereux en production)
      // TODO: Implémenter un parser d'expressions plus sûr
      const func = new Function("ctx", `with(ctx) { return ${condition}; }`)
      return Boolean(func(evalContext))
    } catch (error) {
      console.error("Condition evaluation error:", error)
      return true // Par défaut, exécuter l'étape
    }
  }

  private prepareAgentInput(inputTemplate: string, globalContext: any, previousResults: any[]): string {
    if (!inputTemplate) return ""

    let input = inputTemplate

    // Remplacer les variables du contexte global
    input = input.replace(/\{\{context\.([^}]+)\}\}/g, (match, key) => {
      return globalContext[key] || match
    })

    // Remplacer les résultats des étapes précédentes
    input = input.replace(/\{\{results\.([^.]+)\.([^}]+)\}\}/g, (match, stepName, key) => {
      const stepResult = previousResults.find((r) => r.stepName === stepName)
      return stepResult?.result?.[key] || match
    })

    return input
  }

  post(shared: Record<string, any>, prepRes: any, execRes: any): string {
    // Ajouter le résultat aux résultats globaux
    shared.stepResults.push({
      stepName: prepRes.step.name,
      stepOrder: prepRes.step.step_order,
      status: execRes.status,
      result: execRes.result,
      stepExecutionId: execRes.stepExecutionId,
    })

    // Passer à l'étape suivante
    shared.currentStepIndex++

    // Vérifier s'il reste des étapes
    const totalSteps = shared.workflowData.steps.length
    if (shared.currentStepIndex >= totalSteps) {
      return "complete"
    }

    // Si on échoue et que ce n'est pas skippé, arrêter le workflow
    if (execRes.status === "failed") {
      return "error"
    }

    return "continue"
  }
}
