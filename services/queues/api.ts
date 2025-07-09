import { api, APIError } from "encore.dev/api"
import { getAuthData } from "~encore/auth"
import { query, queryRow, exec } from "../../shared/database"
import { queueManager } from "./queue-manager"
import crypto from "crypto"
import type { Job, CreateJobParams, BatchProcessingParams, BatchResult } from "./types"

// Créer un job
export const createJob = api<CreateJobParams, { job: Job }>(
  { expose: true, method: "POST", path: "/jobs", auth: true },
  async (params): Promise<{ job: Job }> => {
    const jobId = crypto.randomUUID()
    const scheduledAt = params.scheduledAt || new Date().toISOString()

    await exec(
      `INSERT INTO jobs (
        id, queue_name, job_type, payload, priority, max_retries, scheduled_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        jobId,
        params.queueName,
        params.jobType,
        JSON.stringify(params.payload),
        params.priority || 0,
        params.maxRetries || 3,
        scheduledAt,
      ],
    )

    const job = await queryRow<any>(`SELECT * FROM jobs WHERE id = $1`, [jobId])

    // Démarrer le worker pour cette queue si pas déjà fait
    queueManager.startWorker(params.queueName)

    return {
      job: {
        id: job.id,
        queueName: job.queue_name,
        jobType: job.job_type,
        payload: job.payload,
        status: job.status,
        priority: job.priority,
        maxRetries: job.max_retries,
        retryCount: job.retry_count,
        scheduledAt: job.scheduled_at,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        errorMessage: job.error_message,
        resultData: job.result_data,
        createdAt: job.created_at,
      },
    }
  },
)

// Traitement en lot
export const processBatch = api<BatchProcessingParams, { batch: BatchResult }>(
  { expose: true, method: "POST", path: "/batch", auth: true },
  async (params): Promise<{ batch: BatchResult }> => {
    const { userId } = getAuthData()!

    // Vérifier que le projet appartient à l'utilisateur
    const project = await queryRow<{ id: string }>(`SELECT id FROM projects WHERE id = $1 AND user_id = $2`, [
      params.projectId,
      userId,
    ])

    if (!project) {
      throw APIError.notFound("Project not found")
    }

    // Vérifier que tous les agents appartiennent au projet
    const agentCount = await queryRow<{ count: string }>(
      `SELECT COUNT(*) as count FROM agents 
       WHERE id = ANY($1) AND project_id = $2 AND user_id = $3`,
      [params.agentIds, params.projectId, userId],
    )

    if (!agentCount || Number.parseInt(agentCount.count) !== params.agentIds.length) {
      throw APIError.invalidArgument("One or more agents not found in project")
    }

    const batchId = crypto.randomUUID()

    // Créer des jobs pour le traitement en lot
    const batchPayload = {
      batchId,
      projectId: params.projectId,
      agentIds: params.agentIds,
      inputs: params.inputs,
      batchSize: params.batchSize || 10,
      parallelism: params.parallelism || 3,
    }

    const jobId = crypto.randomUUID()
    await exec(
      `INSERT INTO jobs (
        id, queue_name, job_type, payload, priority
      ) VALUES ($1, $2, $3, $4, $5)`,
      [
        jobId,
        "batch_processing",
        "batch_processing",
        JSON.stringify(batchPayload),
        5, // Priorité élevée pour les batches
      ],
    )

    // Démarrer le worker
    queueManager.startWorker("batch_processing")

    return {
      batch: {
        batchId,
        totalJobs: params.inputs.length,
        completedJobs: 0,
        failedJobs: 0,
        results: [],
        status: "running",
      },
    }
  },
)

// Récupérer l'état d'un batch
export const getBatchStatus = api<{ batchId: string }, { batch: BatchResult }>(
  { expose: true, method: "GET", path: "/batch/:batchId", auth: true },
  async ({ batchId }): Promise<{ batch: BatchResult }> => {
    // Chercher le job de batch
    const job = await queryRow<any>(`SELECT * FROM jobs WHERE payload->>'batchId' = $1`, [batchId])

    if (!job) {
      throw APIError.notFound("Batch not found")
    }

    let batch: BatchResult

    if (job.status === "completed" && job.result_data) {
      const result = job.result_data
      batch = {
        batchId,
        totalJobs: result.totalProcessed || 0,
        completedJobs: result.successful || 0,
        failedJobs: result.failed || 0,
        results: result.results || [],
        status: "completed",
      }
    } else if (job.status === "failed") {
      batch = {
        batchId,
        totalJobs: job.payload.inputs?.length || 0,
        completedJobs: 0,
        failedJobs: job.payload.inputs?.length || 0,
        results: [],
        status: "failed",
      }
    } else {
      batch = {
        batchId,
        totalJobs: job.payload.inputs?.length || 0,
        completedJobs: 0,
        failedJobs: 0,
        results: [],
        status: "running",
      }
    }

    return { batch }
  },
)

// Lister les jobs
export const getJobs = api<
  {
    queueName?: string
    status?: string
    limit?: number
    offset?: number
  },
  { jobs: Job[] }
>({ expose: true, method: "GET", path: "/jobs", auth: true }, async (params): Promise<{ jobs: Job[] }> => {
  let sql = `SELECT * FROM jobs WHERE 1=1`
  const queryParams: any[] = []
  let paramIndex = 1

  if (params.queueName) {
    sql += ` AND queue_name = $${paramIndex++}`
    queryParams.push(params.queueName)
  }

  if (params.status) {
    sql += ` AND status = $${paramIndex++}`
    queryParams.push(params.status)
  }

  sql += ` ORDER BY created_at DESC`

  if (params.limit) {
    sql += ` LIMIT $${paramIndex++}`
    queryParams.push(params.limit.toString())
  }

  if (params.offset) {
    sql += ` OFFSET $${paramIndex++}`
    queryParams.push(params.offset.toString())
  }

  const jobs = await query<any>(sql, queryParams)

  return {
    jobs: jobs.map((job: any) => ({
      id: job.id,
      queueName: job.queue_name,
      jobType: job.job_type,
      payload: job.payload,
      status: job.status,
      priority: job.priority,
      maxRetries: job.max_retries,
      retryCount: job.retry_count,
      scheduledAt: job.scheduled_at,
      startedAt: job.started_at,
      completedAt: job.completed_at,
      errorMessage: job.error_message,
      resultData: job.result_data,
      createdAt: job.created_at,
    })),
  }
})

// Annuler un job
export const cancelJob = api<{ jobId: string }, { success: boolean }>(
  { expose: true, method: "PUT", path: "/jobs/:jobId/cancel", auth: true },
  async ({ jobId }): Promise<{ success: boolean }> => {
    await exec(`UPDATE jobs SET status = 'cancelled' WHERE id = $1 AND status IN ('pending', 'running')`, [jobId])

    return { success: true }
  },
)
