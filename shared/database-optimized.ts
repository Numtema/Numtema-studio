import { SQLDatabase } from "encore.dev/storage/sqldb"
import { cache } from "./cache"

export const db = new SQLDatabase("numtema_db", {
  migrations: "./migrations",
})

// Optimized query with caching
export async function cachedQuery<T>(
  cacheKey: string,
  sql: string,
  params: any[] = [],
  ttl = 300000, // 5 minutes
): Promise<T[]> {
  return cache.wrap(
    cacheKey,
    async () => {
      const rows: T[] = []
      for await (const row of db.query(sql, ...params)) {
        rows.push(row as T)
      }
      return rows
    },
    ttl,
  )
}

export async function cachedQueryRow<T>(
  cacheKey: string,
  sql: string,
  params: any[] = [],
  ttl = 300000,
): Promise<T | null> {
  return cache.wrap(
    cacheKey,
    async () => {
      return (await db.queryRow(sql, ...params)) as T | null
    },
    ttl,
  )
}

// Batch operations
export async function batchInsert(table: string, columns: string[], values: any[][], batchSize = 1000): Promise<void> {
  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize)

    const placeholders = batch
      .map(
        (_, rowIndex) => `(${columns.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(", ")})`,
      )
      .join(", ")

    const flatValues = batch.flat()

    const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES ${placeholders}`
    await db.exec(sql, ...flatValues)
  }
}

// Optimized pagination
export async function paginatedQuery<T>(
  sql: string,
  params: any[],
  page = 1,
  limit = 20,
): Promise<{ data: T[]; total: number; hasMore: boolean }> {
  const offset = (page - 1) * limit

  // Count query
  const countSql = `SELECT COUNT(*) as total FROM (${sql}) as count_query`
  const countResult = (await db.queryRow(countSql, ...params)) as { total: string }
  const total = Number.parseInt(countResult.total)

  // Data query with pagination
  const dataSql = `${sql} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
  const dataParams = [...params, limit.toString(), offset.toString()]

  const rows: T[] = []
  for await (const row of db.query(dataSql, ...dataParams)) {
    rows.push(row as T)
  }

  return {
    data: rows,
    total,
    hasMore: offset + limit < total,
  }
}

// Prepared statements cache
const preparedStatements = new Map<string, any>()

export function prepareStatement(name: string, sql: string): void {
  preparedStatements.set(name, sql)
}

export async function executeStatement<T>(name: string, params: any[] = []): Promise<T[]> {
  const sql = preparedStatements.get(name)
  if (!sql) {
    throw new Error(`Prepared statement '${name}' not found`)
  }

  const rows: T[] = []
  for await (const row of db.query(sql, ...params)) {
    rows.push(row as T)
  }
  return rows
}

// Initialize commonly used prepared statements
export function initializePreparedStatements(): void {
  prepareStatement(
    "get_user_agents",
    `
    SELECT * FROM agents 
    WHERE user_id = $1 AND status = 'active'
    ORDER BY created_at DESC
  `,
  )

  prepareStatement(
    "get_agent_traces",
    `
    SELECT * FROM execution_traces 
    WHERE agent_id = $1 
    ORDER BY timestamp DESC 
    LIMIT $2
  `,
  )

  prepareStatement(
    "get_project_stats",
    `
    SELECT 
      COUNT(*) as total_executions,
      (COUNT(CASE WHEN status = 'success' THEN 1 END)) as successful_executions,
      AVG(duration_ms) as avg_response_time
    FROM execution_traces 
    WHERE project_id = $1 
    AND timestamp >= $2
  `,
  )
}
