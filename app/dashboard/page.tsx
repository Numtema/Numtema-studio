import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-nasalization gradient-text">Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">$0</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">Cost / Trace</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">$0</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">Avg Tokens for All Traces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">0</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">Avg Tokens for Successful Traces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">0</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">Avg Tokens for Failed Traces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">0</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-nasalization gradient-text">Analytics</h2>
        <Card className="bg-card p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full border p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-muted-foreground"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-nasalization">No traces found</h3>
            <p className="text-center text-muted-foreground">
              Seems like you don't have any traces yet. Create your first
              <br />
              trace to see analytics and insights.
            </p>
            <Button className="mt-2 bg-[#191222] text-white hover:bg-[#191222]/90 rounded-md font-normal">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
