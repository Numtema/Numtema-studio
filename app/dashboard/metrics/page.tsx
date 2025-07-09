"use client"

import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Métriques</h1>
        <p className="page-subtitle">Analysez les performances de vos agents en temps réel</p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
