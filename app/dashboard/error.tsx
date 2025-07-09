"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <CardTitle>Erreur Dashboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Une erreur s'est produite lors du chargement des données du dashboard.
        </p>
        <div className="bg-muted p-3 rounded-md text-sm">
          <code>{error.message || "Erreur inconnue"}</code>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={reset} variant="default">
          Réessayer
        </Button>
      </CardFooter>
    </Card>
  )
}
