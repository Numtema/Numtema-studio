import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon, FilterIcon } from "lucide-react"
import { AgentCard } from "@/components/dashboard/agent-card"
import { TracesList } from "@/components/dashboard/traces-list"
import { ProjectMetrics } from "@/components/dashboard/project-metrics"

export default function ProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-nasalization gradient-text">Nümtema Studio</h1>
          <p className="text-sm text-muted-foreground">Multi-agent platform for AI orchestration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="font-nasalization">
            Overview
          </TabsTrigger>
          <TabsTrigger value="agents" className="font-nasalization">
            Agents
          </TabsTrigger>
          <TabsTrigger value="traces" className="font-nasalization">
            Traces
          </TabsTrigger>
          <TabsTrigger value="settings" className="font-nasalization">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ProjectMetrics />

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-nasalization text-lg">Recent Agents</CardTitle>
                <CardDescription>Your most recently active agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AgentCard
                  name="Community Manager"
                  description="IA dédiée aux PME"
                  model="gemini-2.0-flash"
                  successRate={98}
                  responseTime={1.2}
                />
                <AgentCard
                  name="Data Analyst"
                  description="Analyste de données pour décisions stratégiques"
                  model="gpt-4o"
                  successRate={94}
                  responseTime={2.1}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-nasalization text-lg">Recent Traces</CardTitle>
                <CardDescription>Your most recent execution traces</CardDescription>
              </CardHeader>
              <CardContent>
                <TracesList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <span className="text-sm text-muted-foreground">Showing 2 agents</span>
            </div>
            <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Agent
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AgentCard
              name="Community Manager"
              description="IA dédiée aux PME"
              model="gemini-2.0-flash"
              successRate={98}
              responseTime={1.2}
              expanded
            />
            <AgentCard
              name="Data Analyst"
              description="Analyste de données pour décisions stratégiques"
              model="gpt-4o"
              successRate={94}
              responseTime={2.1}
              expanded
            />
          </div>
        </TabsContent>

        <TabsContent value="traces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Execution Traces</CardTitle>
              <CardDescription>View detailed execution traces of your agents</CardDescription>
            </CardHeader>
            <CardContent>
              <TracesList expanded />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Project Settings</CardTitle>
              <CardDescription>Manage your project configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <input type="text" defaultValue="Nümtema Studio" className="w-full p-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  defaultValue="Multi-agent platform for AI orchestration"
                  className="w-full p-2 border rounded-md h-24"
                />
              </div>
              <div className="pt-4">
                <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
