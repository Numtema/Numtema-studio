"use client"
import { Progress } from "@/components/ui/progress"

interface AgentInfoPanelProps {
  agent: string
}

export function AgentInfoPanel({ agent }: AgentInfoPanelProps) {
  // Simulated data - in a real app, this would come from your agent state
  const agentData = {
    A: {
      goal: "Maximiser l'engagement",
      backstory: "Community Manager IA dédié aux PME",
      memoryUsage: 65,
      successRate: 98,
      responseTime: 1.2,
    },
    B: {
      goal: "Analyser les données pour décisions stratégiques",
      backstory: "Analyste de données spécialisé en business intelligence",
      memoryUsage: 42,
      successRate: 94,
      responseTime: 2.1,
    },
  }

  const data = agentData[agent as keyof typeof agentData]

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold">Goal</h4>
        <p className="text-sm text-muted-foreground">{data.goal}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Backstory</h4>
        <p className="text-sm text-muted-foreground">{data.backstory}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Memory Usage</span>
          <span className="text-sm font-medium">{data.memoryUsage}%</span>
        </div>
        <Progress value={data.memoryUsage} className="h-2" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md bg-muted p-2">
          <div className="text-xs text-muted-foreground">Success Rate</div>
          <div className="text-lg font-bold">{data.successRate}%</div>
        </div>
        <div className="rounded-md bg-muted p-2">
          <div className="text-xs text-muted-foreground">Avg. Response</div>
          <div className="text-lg font-bold">{data.responseTime}s</div>
        </div>
      </div>
    </div>
  )
}
