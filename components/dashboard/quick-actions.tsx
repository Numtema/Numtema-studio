"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Play, Settings, BarChart3 } from "lucide-react"

const actions = [
  {
    title: "Create Agent",
    description: "Build a new AI agent",
    icon: Plus,
    href: "/dashboard/agents/new",
  },
  {
    title: "Run Workflow",
    description: "Execute a workflow",
    icon: Play,
    href: "/dashboard/workflows/run",
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    description: "Configure your workspace",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto flex-col items-start p-4 text-left bg-transparent"
            asChild
          >
            <a href={action.href}>
              <action.icon className="mb-2 h-6 w-6" />
              <div className="font-medium">{action.title}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
