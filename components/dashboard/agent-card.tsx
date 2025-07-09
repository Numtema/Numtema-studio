import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cpu, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AgentCardProps {
  name: string
  description: string
  model: string
  successRate: number
  responseTime: number
  expanded?: boolean
}

export function AgentCard({ name, description, model, successRate, responseTime, expanded = false }: AgentCardProps) {
  return (
    <Card className={expanded ? "overflow-hidden" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-nasalization">{name}</CardTitle>
          <Badge variant="outline" className="font-normal">
            {model}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 p-2 bg-muted/50 rounded-md">
          <div className="flex space-x-2">
            <Cpu className="text-green-500 h-4 w-4" />
            <Database className="text-green-500 h-4 w-4" />
            <Zap className="text-green-500 h-4 w-4" />
          </div>
          <div className="flex space-x-1">
            <Badge variant="outline" className="font-normal text-xs">
              STM: 12
            </Badge>
            <Badge variant="outline" className="font-normal text-xs">
              LTM: 5
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Memory Usage</span>
            <span className="text-sm font-medium">65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Success Rate</div>
            <div className="text-lg font-bold">{successRate}%</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Avg. Response</div>
            <div className="text-lg font-bold">{responseTime}s</div>
          </div>
        </div>

        {expanded && (
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" className="mr-2">
              Edit
            </Button>
            <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white" size="sm">
              Run
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
