// shared/database.ts
import { SQLDatabase } from "encore.dev/storage/sqldb"

// Base de données principale
export const db = new SQLDatabase("numtema_db", {
  migrations: "./migrations",
})

// Helper pour les requêtes
export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const rows: T[] = []
  for await (const row of db.query(sql, ...params)) {
    rows.push(row as T)
  }
  return rows
}

export async function queryRow<T>(sql: string, params: any[] = []): Promise<T | null> {
  return (await db.queryRow(sql, ...params)) as T | null
}

export async function exec(sql: string, params: any[] = []): Promise<void> {
  await db.exec(sql, ...params)
}
