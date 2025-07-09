import Link from "next/link"

export function DocsSidebar() {
  return (
    <div className="relative">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <div className="space-y-4">
            <div className="py-2">
              <h2 className="font-nasalization mb-2 px-2 text-lg">Introduction</h2>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                <Link href="/docs" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Démarrage rapide
                </Link>
                <Link href="/docs/installation" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Installation
                </Link>
                <Link href="/docs/architecture" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Architecture
                </Link>
              </div>
            </div>
            <div className="py-2">
              <h2 className="font-nasalization mb-2 px-2 text-lg">Guides</h2>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                <Link href="/docs/agents" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Création d'agents
                </Link>
                <Link href="/docs/tracing" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Traçage et débogage
                </Link>
                <Link href="/docs/deployment" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Déploiement
                </Link>
              </div>
            </div>
            <div className="py-2">
              <h2 className="font-nasalization mb-2 px-2 text-lg">API Reference</h2>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                <Link href="/docs/api/client" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Client
                </Link>
                <Link href="/docs/api/project" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Project
                </Link>
                <Link href="/docs/api/agent" className="flex w-full items-center rounded-md p-2 hover:bg-muted">
                  Agent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
