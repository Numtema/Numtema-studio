import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { RealtimeProvider } from "@/components/providers/realtime-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nümtema Studio - AI Agent Platform",
  description: "The leading platform for building, monitoring, and deploying AI agents at scale.",
  keywords: ["AI", "agents", "automation", "machine learning", "platform"],
  authors: [{ name: "Nümtema Studio" }],
  openGraph: {
    title: "Nümtema Studio",
    description: "Build reliable AI agents with advanced monitoring and orchestration.",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <RealtimeProvider>
              {children}
              <Toaster position="top-right" theme="dark" richColors closeButton />
            </RealtimeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
