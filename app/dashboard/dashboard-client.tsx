"use client"

import dynamic from "next/dynamic"

const AnalyticsDashboard = dynamic(() => import("@/components/AnalyticsDashboard"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  ),
})

export default function DashboardClient() {
  return <AnalyticsDashboard />
}
