import { Node } from "pocketflow"
import { ExecuteStep } from "./ExecuteStep"

export class ExecuteParallel extends Node {
  name = "ExecuteParallel"

  prep(shared: Record<string, any>): {
    steps: any[]
    executionId: string
    globalContext: any
  } {
    return {
      steps: shared.workflowData.steps,
      executionId: shared.executionId,
      globalContext: shared.globalContext,
    }
  }

  async exec(params: {
    steps: any[]
    executionId: string
    globalContext: any
  }): Promise<any[]> {
    const executeStep = new ExecuteStep()
    const results: any[] = []

    // Grouper les étapes par niveau de dépendance
    const stepLevels = this.groupStepsByDependency(params.steps)

    // Exécuter niveau par niveau
    for (const level of stepLevels) {
      const levelPromises = level.map(async (step) => {
        const stepContext = {
          step,
          executionId: params.executionId,
          globalContext: params.globalContext,
          previousResults: results,
        }

        try {
          return await executeStep.exec(stepContext)
        } catch (error: any) {
          return {
            stepExecutionId: `error_${step.id}`,
            status: "failed",
            result: null,
            error: error.message,
            step: step,
          }
        }
      })

      // Attendre que toutes les étapes du niveau se terminent
      const levelResults = await Promise.all(levelPromises)
      results.push(...levelResults)

      // Arrêter si une étape critique a échoué
      const criticalFailure = levelResults.some((r) => r.status === "failed" && !r.step?.config?.optional)

      if (criticalFailure) {
        throw new Error("Critical step failed in parallel execution")
      }
    }

    return results
  }

  private groupStepsByDependency(steps: any[]): any[][] {
    const stepMap = new Map(steps.map((step) => [step.id, step]))
    const levels: any[][] = []
    const processed = new Set<string>()

    const addToLevel = (step: any, level: number) => {
      if (!levels[level]) levels[level] = []
      levels[level].push(step)
      processed.add(step.id)
    }

    // Première passe : étapes sans dépendances
    for (const step of steps) {
      if (!step.depends_on || step.depends_on.length === 0) {
        addToLevel(step, 0)
      }
    }

    // Passes suivantes : étapes dont les dépendances sont satisfaites
    let currentLevel = 0
    while (processed.size < steps.length && currentLevel < 10) {
      // Limite de sécurité
      let newItemsProcessed = false
      for (const step of steps) {
        if (processed.has(step.id)) continue

        const dependenciesSatisfied = step.depends_on.every((depId: string) => processed.has(depId))

        if (dependenciesSatisfied) {
          addToLevel(step, currentLevel + 1)
          newItemsProcessed = true
        }
      }
      if (!newItemsProcessed && processed.size < steps.length) {
        // Break circular dependency
        console.error("Circular dependency detected in workflow steps")
        break
      }
      currentLevel++
    }

    return levels.filter((level) => level && level.length > 0)
  }

  post(shared: Record<string, any>, prepRes: any, execRes: any[]): string {
    shared.stepResults = execRes.map((result) => ({
      stepName: result.step?.name || "unknown",
      stepOrder: result.step?.step_order || 0,
      status: result.status,
      result: result.result,
      stepExecutionId: result.stepExecutionId,
    }))

    const hasFailures = execRes.some((r) => r.status === "failed")
    return hasFailures ? "error" : "complete"
  }
}
