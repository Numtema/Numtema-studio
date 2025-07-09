"use client"

import { useEffect, useState } from "react"
import { useAgent } from "@/components/AgentProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Données simulées pour les traces
const tracesData = {
  A: [
    {
      id: "trace_001",
      timestamp: new Date().toISOString(),
      type: "request",
      status: "success",
      duration: "1.2s",
      details: "Chat request processed successfully",
    },
    {
      id: "trace_002",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      type: "rag",
      status: "success",
      duration: "0.8s",
      details: "Retrieved 3 documents from knowledge base",
    },
    {
      id: "trace_003",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      type: "llm",
      status: "warning",
      duration: "2.5s",
      details: "High latency detected in LLM response",
    },
  ],
  B: [
    {
      id: "trace_004",
      timestamp: new Date().toISOString(),
      type: "analytics",
      status: "success",
      duration: "1.5s",
      details: "Data analysis completed successfully",
    },
    {
      id: "trace_005",
      timestamp: new Date(Date.now() - 45000).toISOString(),
      type: "request",
      status: "error",
      duration: "3.2s",
      details: "Error processing request: timeout",
    },
    {
      id: "trace_006",
      timestamp: new Date(Date.now() - 90000).toISOString(),
      type: "llm",
      status: "success",
      duration: "1.8s",
      details: "LLM response generated successfully",
    },
  ],
}

// Données simulées pour les métriques
const metricsData = {
  A: {
    cpu: 35,
    memory: 42,
    requests: 156,
    errors: 2,
    retries: 5,
    fallbacks: 1,
  },
  B: {
    cpu: 28,
    memory: 38,
    requests: 124,
    errors: 8,
    retries: 12,
    fallbacks: 3,
  },
}

export function AgentMonitorPanel() {
  const { currentAgent } = useAgent()
  const [traces, setTraces] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simuler le chargement des données
  useEffect(() => {
    if (!currentAgent) return

    setIsLoading(true)

    // Simuler un appel API
    setTimeout(() => {
      const agentTraces = tracesData[currentAgent.id as keyof typeof tracesData] || []
      const agentMetrics = metricsData[currentAgent.id as keyof typeof metricsData] || {}

      setTraces(agentTraces)
      setMetrics(agentMetrics)
      setIsLoading(false)
    }, 1000)
  }, [currentAgent])

  if (isLoading || !currentAgent) {
    return <div className="h-64 w-full animate-pulse bg-muted rounded-md"></div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{metrics.cpu}%</span>
              <Badge variant="outline">Normal</Badge>
            </div>
            <Progress value={metrics.cpu} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{metrics.memory}%</span>
              <Badge variant="outline">Normal</Badge>
            </div>
            <Progress value={metrics.memory} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.requests}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{metrics.errors} errors</span>
              <span>•</span>
              <span>{metrics.retries} retries</span>
              <span>•</span>
              <span>{metrics.fallbacks} fallbacks</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traces" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traces">Traces</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="traces">
          <Card>
            <CardHeader>
              <CardTitle>Traces en temps réel</CardTitle>
              <CardDescription>Dernières opérations de l'agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {traces.map((trace) => (
                  <div key={trace.id} className="flex items-start gap-4 p-3 border rounded-md">
                    <div className="mt-0.5">
                      {trace.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {trace.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {trace.status === "error" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{trace.type}</Badge>
                          <span className="text-sm font-medium">{trace.details}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{trace.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(trace.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs système</CardTitle>
              <CardDescription>Journaux détaillés de l'agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                <p className="text-green-500">[INFO] [2025-05-23 14:32:15] Agent {currentAgent.id} initialized</p>
                <p className="text-blue-500">
                  [DEBUG] [2025-05-23 14:32:16] Loading memory state: STM={currentAgent.memory.stm}, LTM=
                  {currentAgent.memory.ltm}
                </p>
                <p className="text-green-500">[INFO] [2025-05-23 14:32:17] Model loaded: {currentAgent.model}</p>
                <p className="text-yellow-500">
                  [WARN] [2025-05-23 14:32:18] High latency detected in LLM response: 2.5s
                </p>
                <p className="text-green-500">[INFO] [2025-05-23 14:32:20] Request processed successfully</p>
                <p className="text-blue-500">
                  [DEBUG] [2025-05-23 14:32:21] Memory updated: entities=[user, product, query]
                </p>
                <p className="text-red-500">
                  [ERROR] [2025-05-23 14:32:25] Failed to connect to analytics service: timeout
                </p>
                <p className="text-green-500">
                  [INFO] [2025-05-23 14:32:30] Fallback strategy activated: using cached analytics
                </p>
                <p className="text-green-500">[INFO] [2025-05-23 14:32:35] Response generated successfully</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Événements système</CardTitle>
              <CardDescription>Événements déclenchés par l'agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <Badge>memory.update</Badge>
                    <span className="text-xs text-muted-foreground">14:32:21</span>
                  </div>
                  <p className="text-sm mt-2">Memory state updated with new entities</p>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <Badge>resilience.fallback</Badge>
                    <span className="text-xs text-muted-foreground">14:32:30</span>
                  </div>
                  <p className="text-sm mt-2">Fallback strategy activated due to service timeout</p>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <Badge>qa.feedback</Badge>
                    <span className="text-xs text-muted-foreground">14:32:40</span>
                  </div>
                  <p className="text-sm mt-2">Quality assessment feedback collected for response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
