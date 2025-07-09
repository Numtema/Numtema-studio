"use client"

import dynamic from "next/dynamic"

const AgentCompare = dynamic(() => import("@/components/AgentCompare"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  ),
})

export default function CompareClient() {
  return <AgentCompare />
}
