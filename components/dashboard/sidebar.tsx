"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Bot, Settings, BarChart3, Users, FileText, Zap, GitBranch } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Projects", href: "/dashboard/projects", icon: GitBranch },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Traces", href: "/dashboard/traces", icon: Zap },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Documentation", href: "/dashboard/docs", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-xl font-bold text-violet-600 dark:text-violet-400">Nümtema Studio</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-violet-50 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                          : "text-gray-700 hover:text-violet-700 hover:bg-violet-50 dark:text-gray-300 dark:hover:text-violet-300 dark:hover:bg-violet-900/50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-violet-700 dark:text-violet-300"
                            : "text-gray-400 group-hover:text-violet-700 dark:group-hover:text-violet-300",
                          "h-6 w-6 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
