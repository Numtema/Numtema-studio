"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-violet-900 dark:text-violet-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Supervision et analyse des performances de l'agent</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Taux de réussite</p>
                <p className="text-4xl font-semibold">98%</p>
                <p className="text-xs text-green-600">+2.5% par rapport au mois dernier</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Temps de réponse moyen</p>
                <p className="text-4xl font-semibold">1.2s</p>
                <p className="text-xs text-red-600">-0.3s par rapport au mois dernier</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Score QA global</p>
                <p className="text-4xl font-semibold">92/100</p>
                <p className="text-xs text-green-600">+5 points par rapport au mois dernier</p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-semibold">Performance au fil du temps</h3>
              <p className="text-sm text-muted-foreground">Taux de réussite des requêtes par mois</p>
            </div>

            <div className="h-[300px] w-full">
              <div className="h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Graphique de performance</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Rapports d'activité</h3>

            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                <div>Date</div>
                <div>Agent</div>
                <div>Activité</div>
                <div>Statut</div>
              </div>

              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                  <div className="text-sm">{new Date(2025, 4, 23 - i).toLocaleDateString()}</div>
                  <div className="text-sm">Agent {String.fromCharCode(65 + i)}</div>
                  <div className="text-sm">Analyse de données</div>
                  <div className="text-sm">
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-green-100 text-green-700">
                      Complété
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Monitoring en temps réel</h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Utilisation CPU</p>
                  <p className="text-sm font-medium">45%</p>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Utilisation mémoire</p>
                  <p className="text-sm font-medium">68%</p>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[68%]"></div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
