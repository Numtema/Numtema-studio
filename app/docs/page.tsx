import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFooter } from "@/components/landing-footer"
import { DocsSidebar } from "@/components/docs/sidebar"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="space-y-2">
              <h1 className="font-nasalization text-4xl gradient-text">Documentation</h1>
              <p className="text-lg text-muted-foreground">
                Bienvenue dans la documentation de Nümtema Studio. Apprenez à construire, tracer et déployer des agents
                IA fiables.
              </p>
            </div>
            <div className="mt-8 space-y-10">
              <div>
                <h2 className="font-nasalization text-2xl">Démarrage rapide</h2>
                <div className="mt-4 space-y-4">
                  <p>
                    Nümtema Studio est une plateforme complète pour développer, surveiller et déployer des agents IA.
                    Suivez ce guide pour commencer à utiliser Nümtema Studio.
                  </p>
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-nasalization text-lg mb-2">Installation</h3>
                    <p className="mb-2">Installez Nümtema Studio via pip:</p>
                    <pre className="bg-background p-2 rounded-md overflow-x-auto">
                      <code>pip install numtema</code>
                    </pre>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-nasalization text-lg mb-2">Configuration</h3>
                    <p className="mb-2">Configurez votre projet:</p>
                    <pre className="bg-background p-2 rounded-md overflow-x-auto">
                      <code>
                        {`import numtema as nt

# Initialize the client
client = nt.Client(api_key="your_api_key")

# Create a new project
project = client.create_project(
    name="My First Project",
    description="A simple project to get started"
)`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-nasalization text-2xl">Création d'agents</h2>
                <div className="mt-4 space-y-4">
                  <p>
                    Nümtema Studio vous permet de créer des agents IA personnalisés pour diverses tâches. Voici comment
                    créer votre premier agent:
                  </p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# Create a new agent
agent = project.create_agent(
    name="Customer Support",
    description="An agent that handles customer inquiries",
    model="gpt-4o",
    system_prompt="You are a helpful customer support agent..."
)

# Add capabilities to your agent
agent.add_tool("knowledge_base", {
    "source": "company_docs.pdf"
})

# Deploy your agent
agent.deploy()`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <LandingFooter />
    </div>
  )
}
