import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid, Clock } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Nümtema Studio",
      organization: "Lionel Numtema's org",
      description: "Multi-agent platform for AI orchestration",
      traces: 24,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Customer Support Bot",
      organization: "Lionel Numtema's org",
      description: "AI assistant for customer inquiries",
      traces: 156,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Data Analysis Agent",
      organization: "Lionel Numtema's org",
      description: "Automated data processing and insights",
      traces: 78,
      lastActive: "3 days ago",
    },
  ]

  const activities = [
    {
      id: 1,
      type: "trace",
      project: "Customer Support Bot",
      description: "New trace created",
      time: "Today at 14:32",
    },
    {
      id: 2,
      type: "update",
      project: "Data Analysis Agent",
      description: "Project updated",
      time: "Yesterday at 09:15",
    },
    {
      id: 3,
      type: "api",
      project: "Nümtema Studio",
      description: "API key created",
      time: "3 days ago at 18:42",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-primary">Projects</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <span className="mr-2">+</span> New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.organization}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm mb-4">{project.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Grid className="h-4 w-4 mr-1" />
                  <span className="mr-4">{project.traces} Traces</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last active: {project.lastActive}</span>
                </div>
              </div>
              <div className="border-t p-4">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">▶</span> Open Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 border rounded-lg bg-white dark:bg-gray-800">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                {activity.type === "trace" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 5V19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 12L5 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {activity.type === "update" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 7L10 17L5 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {activity.type === "api" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 12H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H5C5.55228 19 6 18.5523 6 18V6C6 5.44772 5.55228 5 5 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 5H19C18.4477 5 18 5.44772 18 6V18C18 18.5523 18.4477 19 19 19H21C21.5523 19 22 18.5523 22 18V6C22 5.44772 21.5523 5 21 5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    {activity.description} in {activity.project}
                  </h4>
                  <Link href="#" className="text-sm text-primary">
                    View
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
