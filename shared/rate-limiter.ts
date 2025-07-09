interface RateLimitRule {
  windowMs: number
  maxRequests: number
  keyGenerator: (req: any) => string
}

class RateLimiter {
  private requests = new Map<string, number[]>()
  private rules = new Map<string, RateLimitRule>()

  addRule(name: string, rule: RateLimitRule): void {
    this.rules.set(name, rule)
  }

  async checkLimit(ruleName: string, req: any): Promise<{ allowed: boolean; resetTime?: number }> {
    const rule = this.rules.get(ruleName)
    if (!rule) {
      return { allowed: true }
    }

    const key = rule.keyGenerator(req)
    const now = Date.now()
    const windowStart = now - rule.windowMs

    // Get existing requests for this key
    let currentRequests = this.requests.get(key) || []

    // Remove requests outside the window
    currentRequests = currentRequests.filter((timestamp) => timestamp > windowStart)

    // Check if limit exceeded
    if (currentRequests.length >= rule.maxRequests) {
      const oldestRequest = Math.min(...currentRequests)
      const resetTime = oldestRequest + rule.windowMs
      return { allowed: false, resetTime }
    }

    // Add current request
    currentRequests.push(now)
    this.requests.set(key, currentRequests)

    return { allowed: true }
  }

  // Cleanup old entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, currentRequests] of this.requests.entries()) {
      const validRequests = currentRequests.filter(
        (timestamp) => now - timestamp < 24 * 60 * 60 * 1000, // Keep last 24h
      )

      if (validRequests.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, validRequests)
      }
    }
  }
}

export const rateLimiter = new RateLimiter()

// Setup common rate limiting rules
rateLimiter.addRule("api_calls", {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  keyGenerator: (req) => req.userId || req.ip,
})

rateLimiter.addRule("agent_executions", {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20,
  keyGenerator: (req) => `${req.userId}:agent_exec`,
})

rateLimiter.addRule("batch_processing", {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
  keyGenerator: (req) => `${req.userId}:batch`,
})

// Cleanup every 10 minutes
setInterval(
  () => {
    rateLimiter.cleanup()
  },
  10 * 60 * 1000,
)
