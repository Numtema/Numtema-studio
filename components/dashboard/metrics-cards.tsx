"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Zap, TrendingUp, AlertTriangle } from "lucide-react"

const metrics = [
  {
    title: "Active Agents",
    value: "24",
    change: "+12%",
    changeType: "positive" as const,
    icon: Bot,
  },
  {
    title: "Total Executions",
    value: "1,234",
    change: "+23%",
    changeType: "positive" as const,
    icon: Zap,
  },
  {
    title: "Success Rate",
    value: "98.5%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Errors",
    value: "3",
    change: "-50%",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
