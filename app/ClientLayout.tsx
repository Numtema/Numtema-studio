"use client"

import type React from "react"
import { AuthProvider } from "@/components/AuthProvider"
import { AgentProvider } from "@/components/AgentProvider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AgentProvider>{children}</AgentProvider>
    </AuthProvider>
  )
}
