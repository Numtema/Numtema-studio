"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Requêtes totales",
      value: "12,345",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Temps de réponse moyen",
      value: "1.2s",
      change: "-0.3s",
      trend: "down",
    },
    {
      title: "Taux de succès",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
    },
    {
      title: "Agents actifs",
      value: "24",
      change: "+3",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Aperçu des dernières interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouvelle conversation avec Agent {String.fromCharCode(65 + i)}</p>
                  <p className="text-xs text-muted-foreground">
                    Il y a {i + 1} minute{i > 0 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
