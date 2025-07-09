import { Activity, Cpu, Database, GitBranch, Lock, Zap } from "lucide-react"

export function LandingFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to build reliable AI agents
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides comprehensive tools for developing, monitoring, and deploying AI agents at scale.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Monitoring & Observability</h3>
            <p className="text-center text-muted-foreground">
              Real-time metrics, tracing, and logging for your AI agents.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Knowledge Sources</h3>
            <p className="text-center text-muted-foreground">
              Connect your agents to various knowledge sources and RAG systems.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Multi-Agent Architecture</h3>
            <p className="text-center text-muted-foreground">
              Build and orchestrate complex systems with multiple specialized agents.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <GitBranch className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Version Control</h3>
            <p className="text-center text-muted-foreground">
              Track changes and roll back to previous versions of your agents.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Security & Governance</h3>
            <p className="text-center text-muted-foreground">Enterprise-grade security and compliance features.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-muted p-2">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Auto-Scaling & Resilience</h3>
            <p className="text-center text-muted-foreground">
              Automatically scale your agents based on demand and ensure high availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
