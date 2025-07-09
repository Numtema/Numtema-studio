// lib/api-client.ts
import { toast } from "sonner"

export interface APIError {
  message: string
  code?: string
  details?: any
}

export interface APIResponse<T> {
  data?: T
  error?: APIError
  meta?: {
    pagination?: {
      page: number
      limit: number
      total: number
      hasMore: boolean
    }
  }
}

class APIClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL = "http://localhost:4000") {
    this.baseURL = baseURL

    // Load token from localStorage
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("numtema_token")
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("numtema_token", token)
      } else {
        localStorage.removeItem("numtema_token")
      }
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        const error: APIError = {
          message: data.message || `HTTP ${response.status}`,
          code: data.code,
          details: data.details,
        }
        return { error }
      }

      return { data }
    } catch (error: any) {
      return {
        error: {
          message: error.message || "Network error",
          code: "NETWORK_ERROR",
        },
      }
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{
      user: any
      token: string
      expiresAt: string
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  async register(email: string, password: string, name: string) {
    const response = await this.request<{
      user: any
      token: string
      expiresAt: string
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })

    if (response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" })
    this.setToken(null)
  }

  async getProfile() {
    return this.request<{ user: any }>("/auth/profile")
  }

  // Projects methods
  async getProjects() {
    return this.request<{ projects: any[] }>("/projects")
  }

  async createProject(data: any) {
    return this.request<{ project: any }>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getProject(id: string) {
    return this.request<{ project: any }>(`/projects/${id}`)
  }

  async updateProject(id: string, data: any) {
    return this.request<{ project: any }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: string) {
    return this.request<{ success: boolean }>(`/projects/${id}`, {
      method: "DELETE",
    })
  }

  async getProjectStats(id: string) {
    return this.request<{ stats: any }>(`/projects/${id}/stats`)
  }

  // Agents methods
  async getAgents(projectId?: string) {
    const params = projectId ? `?projectId=${projectId}` : ""
    return this.request<{ agents: any[] }>(`/agents${params}`)
  }

  async createAgent(data: any) {
    return this.request<{ agent: any }>("/agents", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getAgent(id: string) {
    return this.request<{ agent: any }>(`/agents/${id}`)
  }

  async updateAgent(id: string, data: any) {
    return this.request<{ agent: any }>(`/agents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteAgent(id: string) {
    return this.request<{ success: boolean }>(`/agents/${id}`, {
      method: "DELETE",
    })
  }

  async executeAgent(id: string, input: string, context?: any) {
    return this.request<any>(`/agents/${id}/execute`, {
      method: "POST",
      body: JSON.stringify({ input, context }),
    })
  }

  // Workflows methods
  async getWorkflows(projectId?: string) {
    const params = projectId ? `?projectId=${projectId}` : ""
    return this.request<{ workflows: any[] }>(`/workflows${params}`)
  }

  async createWorkflow(data: any) {
    return this.request<{ workflow: any }>("/workflows", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async executeWorkflow(id: string, inputData?: any, context?: any) {
    return this.request<any>(`/workflows/${id}/execute`, {
      method: "POST",
      body: JSON.stringify({ inputData, context }),
    })
  }

  // Analytics methods
  async getDashboard(timeframe = "24h") {
    return this.request<{ metrics: any }>(`/analytics/dashboard?timeframe=${timeframe}`)
  }

  async getAgentAnalytics(agentId: string, timeframe = "24h", includeTimeSeries = false) {
    return this.request<{ analytics: any }>(
      `/analytics/agents/${agentId}?timeframe=${timeframe}&includeTimeSeries=${includeTimeSeries}`,
    )
  }

  async getProjectAnalytics(projectId: string, timeframe = "24h") {
    return this.request<{ analytics: any }>(`/analytics/projects/${projectId}?timeframe=${timeframe}`)
  }

  async getRealtimeMetrics() {
    return this.request<{ metrics: any }>("/analytics/realtime")
  }

  async compareAgents(agentIds: string[], timeframe = "24h") {
    return this.request<{ comparison: any }>("/analytics/compare", {
      method: "POST",
      body: JSON.stringify({ agentIds, timeframe }),
    })
  }

  // Monitoring methods
  async getTraces(params?: any) {
    const query = new URLSearchParams(params).toString()
    return this.request<{ traces: any[] }>(`/traces${query ? `?${query}` : ""}`)
  }

  async getMetrics(params?: any) {
    const query = new URLSearchParams(params).toString()
    return this.request<{ metrics: any[] }>(`/metrics${query ? `?${query}` : ""}`)
  }

  async getNotifications(limit?: number, unreadOnly?: boolean) {
    const params = new URLSearchParams()
    if (limit) params.set("limit", limit.toString())
    if (unreadOnly) params.set("unreadOnly", "true")

    return this.request<{ notifications: any[] }>(`/notifications?${params.toString()}`)
  }

  async markNotificationRead(id: string) {
    return this.request<{ success: boolean }>(`/notifications/${id}/read`, {
      method: "PUT",
    })
  }

  // Batch processing
  async processBatch(data: any) {
    return this.request<{ batch: any }>("/batch", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getBatchStatus(batchId: string) {
    return this.request<{ batch: any }>(`/batch/${batchId}`)
  }

  // Jobs
  async getJobs(params?: any) {
    const query = new URLSearchParams(params).toString()
    return this.request<{ jobs: any[] }>(`/jobs${query ? `?${query}` : ""}`)
  }

  async cancelJob(id: string) {
    return this.request<{ success: boolean }>(`/jobs/${id}/cancel`, {
      method: "PUT",
    })
  }

  // WebSocket connection for real-time updates
  connectWebSocket(agentId?: string): WebSocket | null {
    if (typeof window === "undefined") return null

    const wsUrl = `ws://localhost:4000/ws${agentId ? `/${agentId}` : ""}`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      console.log("WebSocket connected")
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    return ws
  }
}

export const apiClient = new APIClient()

// Hook for API calls with loading states
export function useAPI() {
  return {
    client: apiClient,
    handleError: (error: APIError) => {
      toast.error(error.message)
      console.error("API Error:", error)
    },
    handleSuccess: (message: string) => {
      toast.success(message)
    },
  }
}
