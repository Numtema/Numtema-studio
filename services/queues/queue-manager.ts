import { queryRow, exec } from "../../shared/database"
import { executeAgentFlow } from "../agents/flow"
import { executeWorkflowFlow } from "../workflows/flow"
import crypto from "crypto"

export class QueueManager {
  private workers = new Map<string, boolean>() // queueName -> isRunning
  private maxWorkers = 5

  async startWorker(queueName: string): Promise<void> {
    if (this.workers.get(queueName)) {
      return // Worker déjà en cours
    }

    this.workers.set(queueName, true)

    while (this.workers.get(queueName)) {
      try {
        const job = await this.getNextJob(queueName)

        if (!job) {
          // Aucun job disponible, attendre un peu
          await new Promise((resolve) => setTimeout(resolve, 1000))
          continue
        }

        await this.processJob(job)
      } catch (error) {
        console.error(`Queue worker error for ${queueName}:`, error)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    }
  }

  async stopWorker(queueName: string): Promise<void> {
    this.workers.set(queueName, false)
  }

  private async getNextJob(queueName: string): Promise<any | null> {
    // Récupérer le prochain job en attente
    const job = await queryRow<any>(
      `SELECT * FROM jobs 
       WHERE queue_name = $1 
       AND status = 'pending' 
       AND scheduled_at <= NOW()
       ORDER BY priority DESC, created_at ASC
       LIMIT 1 FOR UPDATE SKIP LOCKED`,
      [queueName],
    )

    if (!job) return null

    // Marquer le job comme en cours
    await exec(
      `UPDATE jobs 
       SET status = 'running', started_at = NOW()
       WHERE id = $1`,
      [job.id],
    )

    return job
  }

  private async processJob(job: any): Promise<void> {
    const startTime = Date.now()

    try {
      let result

      switch (job.job_type) {
        case "agent_execution":
          result = await this.processAgentExecution(job.payload)
          break

        case "workflow_execution":
          result = await this.processWorkflowExecution(job.payload)
          break

        case "batch_processing":
          result = await this.processBatchProcessing(job.payload)
          break

        case "data_export":
          result = await this.processDataExport(job.payload)
          break

        default:
          throw new Error(`Unknown job type: ${job.job_type}`)
      }

      // Marquer comme terminé avec succès
      await exec(
        `UPDATE jobs 
         SET status = 'completed', completed_at = NOW(), result_data = $1
         WHERE id = $2`,
        [JSON.stringify(result), job.id],
      )
    } catch (error: any) {
      const duration = Date.now() - startTime

      // Incrémenter le compteur de retry
      const newRetryCount = job.retry_count + 1

      if (newRetryCount < job.max_retries) {
        // Programmer un nouveau essai
        const retryDelay = Math.min(1000 * Math.pow(2, newRetryCount), 300000) // Backoff exponentiel, max 5min
        const nextAttempt = new Date(Date.now() + retryDelay)

        await exec(
          `UPDATE jobs 
           SET status = 'pending', retry_count = $1, scheduled_at = $2, error_message = $3
           WHERE id = $4`,
          [newRetryCount, nextAttempt.toISOString(), error.message, job.id],
        )
      } else {
        // Marquer comme échoué définitivement
        await exec(
          `UPDATE jobs 
           SET status = 'failed', completed_at = NOW(), error_message = $1
           WHERE id = $2`,
          [error.message, job.id],
        )
      }
    }
  }

  private async processAgentExecution(payload: any): Promise<any> {
    const { agentId, input, context } = payload
    return await executeAgentFlow(agentId, input, context)
  }

  private async processWorkflowExecution(payload: any): Promise<any> {
    const { workflowId, inputData, context } = payload
    return await executeWorkflowFlow(workflowId, inputData, context)
  }

  private async processBatchProcessing(payload: any): Promise<any> {
    const { projectId, agentIds, inputs, batchSize = 10, parallelism = 3 } = payload

    const results: any[] = []
    const batches = this.createBatches(inputs, batchSize)

    for (const batch of batches) {
      const batchPromises = batch.map(async (input, index) => {
        const agentId = agentIds[index % agentIds.length] // Round-robin
        try {
          return await executeAgentFlow(agentId, input, { batchProcessing: true })
        } catch (error: any) {
          return { error: error.message, input }
        }
      })

      // Limiter la concurrence
      const batchResults = await this.limitConcurrency(batchPromises, parallelism)
      results.push(...batchResults)
    }

    return {
      totalProcessed: inputs.length,
      successful: results.filter((r) => r.success).length,
      failed: results.filter((r) => r.error).length,
      results,
    }
  }

  private async processDataExport(payload: any): Promise<any> {
    const { projectId, format, dateRange, includeTraces, includeMetrics } = payload

    // TODO: Implémenter l'export de données
    return {
      exportId: crypto.randomUUID(),
      format,
      recordsExported: 0,
      downloadUrl: `https://exports.numtema.com/${crypto.randomUUID()}.${format}`,
    }
  }

  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches = []
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize))
    }
    return batches
  }

  private async limitConcurrency<T>(promises: Promise<T>[], limit: number): Promise<T[]> {
    const results: T[] = []
    const executing: Promise<any>[] = []
    for (const promise of promises) {
      const p = Promise.resolve(promise).then((res) => {
        results.push(res)
        executing.splice(executing.indexOf(p), 1)
      })
      executing.push(p)
      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
    await Promise.all(executing)
    return results
  }
}

// Instance globale du gestionnaire de queues
export const queueManager = new QueueManager()
