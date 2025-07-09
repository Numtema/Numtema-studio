"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

const services = [
  { name: "API Gateway", status: "operational", icon: CheckCircle },
  { name: "Agent Runtime", status: "operational", icon: CheckCircle },
  { name: "Database", status: "operational", icon: CheckCircle },
  { name: "Queue System", status: "degraded", icon: AlertCircle },
  { name: "Monitoring", status: "operational", icon: CheckCircle },
]

const statusColors = {
  operational: "bg-green-500",
  degraded: "bg-yellow-500",
  down: "bg-red-500",
}

const statusIcons = {
  operational: CheckCircle,
  degraded: AlertCircle,
  down: XCircle,
}

export function SystemStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service) => {
          const Icon = statusIcons[service.status as keyof typeof statusIcons]
          return (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon
                  className={`h-4 w-4 ${
                    service.status === "operational"
                      ? "text-green-500"
                      : service.status === "degraded"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                />
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <Badge variant={service.status === "operational" ? "default" : "destructive"}>{service.status}</Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
