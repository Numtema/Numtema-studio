"use client"

import { useAgent } from "@/components/AgentProvider"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgentInfoPanel() {
  const { currentAgent, isLoading } = useAgent()

  if (isLoading || !currentAgent) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl font-nasalization">Agent Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-full animate-pulse bg-muted rounded"></div>
          <div className="h-20 w-full animate-pulse bg-muted rounded"></div>
          <div className="h-4 w-full animate-pulse bg-muted rounded"></div>
          <div className="h-4 w-full animate-pulse bg-muted rounded"></div>
        </CardContent>
      </Card>
    )
  }

  // Données simulées pour l'affichage
  const agentData = {
    memoryUsage: 65,
    successRate: currentAgent.id === "A" ? 98 : 94,
    responseTime: currentAgent.id === "A" ? 1.2 : 2.1,
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-nasalization">{currentAgent.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold">Goal</h4>
          <p className="text-sm text-muted-foreground">{currentAgent.goal}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Backstory</h4>
          <p className="text-sm text-muted-foreground">{currentAgent.backstory}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Memory Usage</span>
            <span className="text-sm font-medium">{agentData.memoryUsage}%</span>
          </div>
          <Progress value={agentData.memoryUsage} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Success Rate</div>
            <div className="text-lg font-bold">{agentData.successRate}%</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Avg. Response</div>
            <div className="text-lg font-bold">{agentData.responseTime}s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
