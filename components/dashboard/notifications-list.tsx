"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertTriangle, CheckCircle, Info } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Agent deployed successfully",
    message: "Customer Support Bot is now live",
    time: "5 minutes ago",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "warning",
    title: "High memory usage detected",
    message: "Data Processor agent using 85% memory",
    time: "10 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled maintenance",
    message: "System maintenance in 2 hours",
    time: "1 hour ago",
    icon: Info,
  },
]

const typeColors = {
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
  info: "text-blue-500",
}

export function NotificationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3">
            <notification.icon
              className={`h-5 w-5 mt-0.5 ${typeColors[notification.type as keyof typeof typeColors]}`}
            />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-xs text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
