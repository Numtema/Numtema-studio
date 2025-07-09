"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
          Activity chart would be rendered here
        </div>
      </CardContent>
    </Card>
  )
}
