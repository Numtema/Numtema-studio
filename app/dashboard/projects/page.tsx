import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/dashboard/project-card"
import { PlusIcon } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-nasalization gradient-text">Projects</h1>
        <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="Nümtema Studio"
            description="Multi-agent platform for AI orchestration"
            organization="Lionel Numtema's org"
            traces={24}
            lastActive="2 hours ago"
          />
          <ProjectCard
            title="Customer Support Bot"
            description="AI assistant for customer inquiries"
            organization="Lionel Numtema's org"
            traces={156}
            lastActive="1 day ago"
          />
          <ProjectCard
            title="Data Analysis Agent"
            description="Automated data processing and insights"
            organization="Lionel Numtema's org"
            traces={78}
            lastActive="3 days ago"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-nasalization mb-4">Recent Activity</h2>
        <div className="rounded-lg border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#6C5CE7]/20 flex items-center justify-center">
                  <PlusIcon className="h-4 w-4 text-[#6C5CE7]" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New trace created in <span className="font-medium">Customer Support Bot</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Today at 14:32</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
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
                    className="h-4 w-4 text-green-500"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Project <span className="font-medium">Data Analysis Agent</span> updated
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday at 09:15</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
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
                    className="h-4 w-4 text-blue-500"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    API key created for <span className="font-medium">Nümtema Studio</span>
                  </p>
                  <p className="text-xs text-muted-foreground">3 days ago at 18:42</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
