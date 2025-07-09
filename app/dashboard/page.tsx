// app/(dashboard)/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDashboardMetrics } from "@/hooks/use-api"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { ActivityChart } from "@/components/charts/activity-chart"
import { TopAgentsChart } from "@/components/charts/top-agents-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SystemStatus } from "@/components/dashboard/system-status"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { AlertTriangle, TrendingUp, Zap, Plus } from "lucide-react"

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("24h")
  const { data: dashboardData, loading, error, refetch } = useDashboardMetrics(timeframe)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/10">
        <CardContent className="flex items-center gap-2 pt-6">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span className="text-red-600">Erreur lors du chargement: {error}</span>
          <Button variant="outline" size="sm" onClick={refetch} className="ml-auto bg-transparent">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    )
  }

  const metrics = dashboardData?.metrics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-nasalization text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">Vue d'ensemble de vos agents et workflows IA</p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 heure</SelectItem>
              <SelectItem value="24h">24 heures</SelectItem>
              <SelectItem value="7d">7 jours</SelectItem>
              <SelectItem value="30d">30 jours</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel Agent
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      {metrics && <MetricsCards metrics={metrics} />}

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Activité des agents
              </CardTitle>
              <CardDescription>
                Exécutions et performances sur{" "}
                {timeframe === "1h"
                  ? "la dernière heure"
                  : timeframe === "24h"
                    ? "les dernières 24h"
                    : timeframe === "7d"
                      ? "les 7 derniers jours"
                      : "les 30 derniers jours"}
              </CardDescription>
            </CardHeader>
            <CardContent>{metrics && <ActivityChart timeframe={timeframe} />}</CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div>
          <SystemStatus />
        </div>
      </div>

      {/* Secondary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Agents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Top Agents
            </CardTitle>
            <CardDescription>Agents les plus performants</CardDescription>
          </CardHeader>
          <CardContent>{metrics && <TopAgentsChart agents={metrics.topAgents} />}</CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières exécutions d'agents</CardDescription>
          </CardHeader>
          <CardContent>{metrics && <RecentActivity activities={metrics.recentActivity} />}</CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Erreurs</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overview content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics?.topAgents.map((agent, index) => (
              <Card key={agent.agentId}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">#{index + 1} Agent</p>
                      <p className="text-lg font-semibold">{agent.agentName}</p>
                    </div>
                    <Badge variant="outline">{agent.executionCount} exec</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Succès</span>
                      <span className="font-medium">{agent.successRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          {/* Performance details */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse de performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics?.avgResponseTime.toFixed(0)}ms</div>
                    <p className="text-sm text-muted-foreground">Temps de réponse moyen</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics?.throughput.toFixed(1)}/h</div>
                    <p className="text-sm text-muted-foreground">Débit</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics?.successRate.toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground">Taux de succès</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          {/* Error analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Analyse des erreurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Taux d'erreur: {metrics?.errorRate.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          {/* Usage statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques d'utilisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Agents actifs</h4>
                  <div className="text-3xl font-bold">{metrics?.activeAgents}</div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Projets totaux</h4>
                  <div className="text-3xl font-bold">{metrics?.totalProjects}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
