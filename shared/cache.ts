class CacheManager {
  private cache = new Map<string, { data: any; expiry: number }>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl
    this.cache.set(key, { data, expiry })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Invalidate patterns
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern.replace("*", ".*"))
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  // Cache wrapper for functions
  async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) return cached

    const result = await fn()
    this.set(key, result, ttl)
    return result
  }
}

export const cache = new CacheManager()

// Helpers pour clés de cache
export const cacheKeys = {
  userProfile: (userId: string) => `user:${userId}:profile`,
  agentData: (agentId: string) => `agent:${agentId}:data`,
  projectStats: (projectId: string, timeframe: string) => `project:${projectId}:stats:${timeframe}`,
  dashboardMetrics: (userId: string, timeframe: string) => `dashboard:${userId}:${timeframe}`,
  agentAnalytics: (agentId: string, timeframe: string) => `analytics:agent:${agentId}:${timeframe}`,
  realtimeMetrics: () => `realtime:metrics`,
}
