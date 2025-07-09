import Link from "next/link"
import { BarChart2, Box, FileText, MessageSquare, User, Cpu, LayoutDashboard, Disc } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardSidebar() {
  return (
    <aside className="w-[240px] border-r bg-background">
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-1 p-2">
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <Box className="h-4 w-4" />
            <span>Projects</span>
          </Link>
          <Link
            href="/dashboard/traces"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Traces</span>
          </Link>
          <Link
            href="/dashboard/metrics"
            className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-sm font-normal text-foreground"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Metrics</span>
          </Link>
          <Link
            href="/dashboard/mcp"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <Cpu className="h-4 w-4" />
            <span>MCP (Waitlist)</span>
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
              className="ml-auto h-4 w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        </div>
        <div className="mt-2 flex flex-col gap-1 border-t p-2">
          <Link
            href="/dashboard/docs"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            <span>Docs</span>
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
              className="ml-auto h-4 w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
          <Link
            href="/dashboard/chat"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat with Docs</span>
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
              className="ml-auto h-4 w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
          <Link
            href="/dashboard/discord"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-normal text-foreground hover:bg-muted"
          >
            <Disc className="h-4 w-4" />
            <span>Discord</span>
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
              className="ml-auto h-4 w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        </div>
        <div className="mt-auto flex flex-col gap-1 border-t p-2">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-normal">Dark Mode</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-normal">Lionel Numtema</span>
              <span className="text-xs text-muted-foreground">v0.4.12</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
