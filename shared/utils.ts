import { v4 as uuidv4 } from "uuid"

export const generateId = (prefix?: string): string => {
  const id = uuidv4()
  return prefix ? `${prefix}_${id}` : id
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${(ms / 60000).toFixed(1)}m`
}

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString()
}
