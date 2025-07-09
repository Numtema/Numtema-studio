import { CronJob } from "encore.dev/cron"
import { getCurrentTimestamp } from "../shared/utils"

// Collecte des métriques toutes les 5 minutes
new CronJob("collect-metrics", {
  title: "Collecter les métriques des agents",
  every: "5m",
  endpoint: "collectMetrics",
})

export const collectMetrics = async () => {
  console.log(`📊 [${getCurrentTimestamp()}] Collecting agent metrics...`)

  // En production:
  // 1. Récupérer la liste des agents actifs
  // 2. Collecter CPU, mémoire, temps de réponse
  // 3. Sauvegarder dans agent_metrics

  const mockMetrics = {
    timestamp: getCurrentTimestamp(),
    agentsProcessed: 5,
    avgCpuUsage: 12.5,
    avgMemoryUsage: 45.2,
  }

  console.log(`✅ Metrics collected:`, mockMetrics)
}

// Nettoyage des traces anciennes (quotidien)
new CronJob("cleanup-traces", {
  title: "Nettoyer les traces anciennes",
  every: "24h",
  endpoint: "cleanupTraces",
})

export const cleanupTraces = async () => {
  console.log(`🧹 [${getCurrentTimestamp()}] Cleaning up old traces...`)

  // En production: DELETE FROM execution_traces WHERE timestamp < NOW() - INTERVAL '30 days'

  console.log(`✅ Old traces cleaned up`)
}

// Rapport quotidien
new CronJob("daily-report", {
  title: "Rapport quotidien d'activité",
  every: "24h",
  endpoint: "sendDailyReport",
})

export const sendDailyReport = async () => {
  console.log(`📈 [${getCurrentTimestamp()}] Generating daily report...`)

  const report = {
    date: getCurrentTimestamp(),
    totalExecutions: 150,
    successRate: 94.5,
    avgResponseTime: 1200,
    topAgents: ["agent_1", "agent_2"],
    errors: 8,
  }

  console.log(`📧 Daily report generated:`, report)
  // En production: envoyer par email/Slack
}
