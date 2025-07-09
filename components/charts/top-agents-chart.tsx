"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const agents = [
  { name: "Customer Support Bot", executions: 450, percentage: 85 },
  { name: "Data Processor", executions: 320, percentage: 60 },
  { name: "Email Automation", executions: 280, percentage: 53 },
  { name: "Content Generator", executions: 150, percentage: 28 },
]

export function TopAgentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Agents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{agent.name}</span>
              <span className="text-muted-foreground">{agent.executions} runs</span>
            </div>
            <Progress value={agent.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
