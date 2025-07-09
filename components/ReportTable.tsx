"use client"

import { useState } from "react"
import { useAgent } from "@/components/AgentProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"

// Données simulées pour les rapports
const reportsData = {
  A: [
    {
      id: "rep_001",
      name: "Campagne Marketing Q1",
      date: "2025-03-15",
      status: "completed",
      score: 92,
      metrics: {
        engagement: 87,
        conversion: 12.5,
        retention: 76,
      },
    },
    {
      id: "rep_002",
      name: "Analyse Concurrentielle",
      date: "2025-04-02",
      status: "completed",
      score: 88,
      metrics: {
        accuracy: 91,
        coverage: 85,
        insights: 89,
      },
    },
    {
      id: "rep_003",
      name: "Sentiment Analysis",
      date: "2025-04-10",
      status: "in_progress",
      score: null,
      metrics: {
        progress: 65,
      },
    },
  ],
  B: [
    {
      id: "rep_004",
      name: "Analyse Financière Q1",
      date: "2025-03-20",
      status: "completed",
      score: 95,
      metrics: {
        accuracy: 97,
        insights: 94,
        recommendations: 93,
      },
    },
    {
      id: "rep_005",
      name: "Prévisions Ventes",
      date: "2025-04-05",
      status: "completed",
      score: 89,
      metrics: {
        accuracy: 86,
        confidence: 92,
        horizon: "6 mois",
      },
    },
    {
      id: "rep_006",
      name: "Analyse KPIs",
      date: "2025-04-12",
      status: "in_progress",
      score: null,
      metrics: {
        progress: 78,
      },
    },
  ],
}

export function ReportTable() {
  const { currentAgent } = useAgent()
  const [selectedReport, setSelectedReport] = useState<any>(null)

  if (!currentAgent) {
    return <div className="h-64 w-full animate-pulse bg-muted rounded-md"></div>
  }

  const reports = reportsData[currentAgent.id as keyof typeof reportsData] || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapports</CardTitle>
        <CardDescription>Liste des rapports générés par l'agent</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={report.status === "completed" ? "default" : "secondary"}
                    className={report.status === "completed" ? "bg-green-500" : ""}
                  >
                    {report.status === "completed" ? "Terminé" : "En cours"}
                  </Badge>
                </TableCell>
                <TableCell>{report.score ? `${report.score}/100` : "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedReport(report)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>{report.name}</DialogTitle>
                        <DialogDescription>
                          Rapport généré le {new Date(report.date).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Statut</p>
                            <p className="text-sm text-muted-foreground">
                              {report.status === "completed" ? "Terminé" : "En cours"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Score global</p>
                            <p className="text-sm text-muted-foreground">
                              {report.score ? `${report.score}/100` : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Métriques</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(report.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between p-2 bg-muted rounded-md">
                                <span className="text-sm capitalize">{key}</span>
                                <span className="text-sm font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Télécharger le rapport complet
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Télécharger</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
