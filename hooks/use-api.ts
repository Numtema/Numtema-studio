"use client"

import { useState, useEffect } from "react"

// Mock hook for dashboard metrics
export function useDashboardMetrics(timeframe: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      try {
        // Mock data
        const mockData = {
          metrics: {
            totalAgents: 12,
            activeAgents: 8,
            totalExecutions: 1247,
            successRate: 96.8,
            avgResponseTime: 245,
            errorRate: 3.2,
            topAgents: [
              { agentId: "1", agentName: "Data Analyzer", executionCount: 156, successRate: 98.5 },
              { agentId: "2", agentName: "Content Generator", executionCount: 142, successRate: 96.2 },
              { agentId: "3", agentName: "Email Assistant", executionCount: 128, successRate: 99.1 },
            ],
            recentActivity: [],
          },
        }

        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  const refetch = () => {
    setData(null)
    setLoading(true)
    setError(null)
    // Refetch logic here
  }

  return { data, loading, error, refetch }
}

// Mock hook for projects
export function useProjects() {
  return {
    data: {
      projects: [
        { id: "1", name: "E-commerce Analytics", agentCount: 3 },
        { id: "2", name: "Content Marketing", agentCount: 2 },
        { id: "3", name: "Customer Support", agentCount: 4 },
      ],
    },
  }
}

// Mock hook for notifications
export function useNotifications(limit: number) {
  return {
    data: {
      notifications: [],
    },
  }
}

// Mock hook for realtime data
export function useRealtime() {
  return {
    metrics: {
      systemLoad: 45,
      responseTime: 245,
      currentThroughput: 1247,
      errorRate: 3.2,
      activeConnections: 24,
      queueDepth: 5,
      activityLast30Days: [],
      topAgents: [],
    },
    isConnected: true,
  }
}
