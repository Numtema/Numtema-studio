import { Flow } from "pocketflow"
import { WorkflowOrchestrator } from "./nodes/WorkflowOrchestrator"
import { ExecuteStep } from "./nodes/ExecuteStep"
import { ExecuteParallel } from "./nodes/ExecuteParallel"
import { CompleteWorkflow } from "./nodes/CompleteWorkflow"
import crypto from "crypto"

// Instanciation des nodes
const orchestrator = new WorkflowOrchestrator()
const executeStep = new ExecuteStep()
const executeParallel = new ExecuteParallel()
const completeWorkflow = new CompleteWorkflow()

// Configuration des transitions
orchestrator.on("sequential", executeStep)
orchestrator.on("parallel", executeParallel)

executeStep.on("continue", executeStep) // Boucle pour étapes suivantes
executeStep.on("complete", completeWorkflow) // Fin des étapes
executeStep.on("error", completeWorkflow) // Erreur dans une étape

executeParallel.on("complete", completeWorkflow) // Fin parallèle
executeParallel.on("error", completeWorkflow) // Erreur parallèle

// Création du flow
export const multiAgentWorkflowFlow = new Flow({
  start: orchestrator,
  name: "MultiAgentWorkflowFlow",
})

// Fonction helper pour exécuter un workflow
export async function executeWorkflowFlow(workflowId: string, inputData?: any, context?: Record<string, any>) {
  const shared = {
    workflowId,
    inputData: inputData || {},
    context: context || {},
    executionId: crypto.randomUUID(),
  }

  try {
    await multiAgentWorkflowFlow.run(shared)
    return {
      success: true,
      executionId: shared.executionId,
      result: shared.finalResult,
      workflow: shared.workflowData?.workflow,
    }
  } catch (error: any) {
    return {
      success: false,
      executionId: shared.executionId,
      error: error.message,
      workflow: shared.workflowData?.workflow,
    }
  }
}
