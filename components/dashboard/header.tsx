import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LionIcon } from "@/components/lion-icon"
import { CalendarIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-14 items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LionIcon className="h-6 w-6" />
          <span className="text-base font-nasalization">Nümtema Studio</span>
        </Link>
        <div className="ml-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-sm font-normal">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-sm font-normal">
            Traces
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-normal">April 23rd, 2025 - May 23rd, 2025</span>
          </div>
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-1.5">
            <span className="text-xs font-normal">Default Project</span>
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
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}
