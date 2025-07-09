"use client"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { SystemStatus } from "@/components/dashboard/system-status"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ActivityChart } from "@/components/charts/activity-chart"
import { TopAgentsChart } from "@/components/charts/top-agents-chart"
import { NotificationsList } from "@/components/dashboard/notifications-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your AI agents.
        </p>
      </div>

      <MetricsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuickActions />
        <SystemStatus />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityChart />
        <TopAgentsChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <NotificationsList />
      </div>
    </div>
  )
}
