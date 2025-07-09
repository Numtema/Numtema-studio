"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - en production, viendrait du WebSocket
const mockTraces = [
  { id: 1, node: "PrepareAgent", status: "success", duration: "15ms" },
  { id: 2, node: "ExecuteAgent", status: "success", duration: "750ms" },
  { id: 3, node: "LogTrace", status: "processing", duration: "" },
]

const mockMetrics = { cpu: 12.5, memory: 45.2, requests: 1, errors: 0 }

export function AgentExecutionPanel({ agentId }: { agentId: string }) {
  const [traces, setTraces] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any>(null)
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    // Simulation d'une connexion WebSocket pour les données en temps réel
    setStatus("connected")
    setMetrics(mockMetrics)

    const interval = setInterval(() => {
      const newTrace = mockTraces.find((t) => !traces.some((existing) => existing.id === t.id))
      if (newTrace) {
        setTraces((prev) => [...prev, newTrace])
      } else {
        const processingTrace = traces.find((t) => t.status === "processing")
        if (processingTrace) {
          setTraces((prev) =>
            prev.map((t) => (t.id === processingTrace.id ? { ...t, status: "success", duration: "20ms" } : t)),
          )
          setStatus("completed")
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [agentId, traces])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Live Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            CPU Usage: <Badge variant="secondary">{metrics?.cpu}%</Badge>
          </div>
          <div>
            Memory: <Badge variant="secondary">{metrics?.memory}%</Badge>
          </div>
          <div>
            Requests: <Badge variant="secondary">{metrics?.requests}</Badge>
          </div>
          <div>
            Errors: <Badge variant={metrics?.errors > 0 ? "destructive" : "secondary"}>{metrics?.errors}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>PocketFlow Execution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Status: <span className="font-semibold">{status}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {traces.map((trace, index) => (
              <>
                <div key={trace.id} className="flex flex-col items-center">
                  <div
                    className={`w-24 h-16 rounded-lg flex items-center justify-center text-center p-2 ${trace.status === "success" ? "bg-green-100 dark:bg-green-900" : "bg-blue-100 dark:bg-blue-900"}`}
                  >
                    <span className="text-xs font-semibold">{trace.node}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {trace.duration}
                  </Badge>
                </div>
                {index < traces.length - 1 && <div className="w-8 h-px bg-muted-foreground" />}
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
