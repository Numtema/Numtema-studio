"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Grid,
  FileText,
  MessageSquare,
  User,
  Cpu,
  LayoutDashboard,
  ExternalLink,
  Moon,
  Home,
  Split,
  Boxes,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface SidebarState {
  isCollapsed: boolean
  isMobile: boolean
  mobileOpen: boolean
}

export function DashboardSidebar() {
  const [state, setState] = useState<SidebarState>({
    isCollapsed: false,
    isMobile: false,
    mobileOpen: false,
  })
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 1024
      setState((prev) => ({
        ...prev,
        isMobile,
        isCollapsed: isMobile ? true : prev.isCollapsed,
        mobileOpen: isMobile ? false : prev.mobileOpen,
      }))
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setState((prev) => ({ ...prev, mobileOpen: false }))
  }, [pathname])

  const toggleSidebar = () => {
    setState((prev) => ({
      ...prev,
      isCollapsed: state.isMobile ? prev.isCollapsed : !prev.isCollapsed,
      mobileOpen: state.isMobile ? !prev.mobileOpen : prev.mobileOpen,
    }))
  }

  const isActive = (path: string) => pathname === path

  const sidebarWidth = state.isCollapsed ? "w-[70px]" : "w-[240px]"

  return (
    <>
      {/* Bouton de menu mobile */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {state.mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay pour mobile */}
      {state.isMobile && state.mobileOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={toggleSidebar} />}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-gray-50/80 dark:bg-gray-900/20 border-r transition-all duration-300",
          sidebarWidth,
          state.isMobile && (state.mobileOpen ? "translate-x-0" : "-translate-x-full"),
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className={cn("p-4 border-b flex items-center", state.isCollapsed && "justify-center")}>
            <Link href="/dashboard" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 16.5L3 19L5.5 21.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 19H16.5C19.5376 19 22 16.5376 22 13.5C22 10.4624 19.5376 8 16.5 8H10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7.5 11.5L10 14L7.5 16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14H5C3.34315 14 2 12.6569 2 11C2 9.34315 3.34315 8 5 8H16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {!state.isCollapsed && <h1 className="text-lg font-medium">Nümtema Studio</h1>}
            </Link>

            {/* Bouton pour réduire/agrandir la sidebar (desktop uniquement) */}
            {!state.isMobile && (
              <button
                className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={toggleSidebar}
              >
                {state.isCollapsed ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 5L20 12L13 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 19L4 12L11 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Navigation principale */}
          <div className="flex flex-col gap-1 p-2">
            <Link href="/" className={cn("sidebar-link", isActive("/") && "active")}>
              <Home className="h-4 w-4" />
              {!state.isCollapsed && <span>Accueil</span>}
            </Link>

            <Link href="/chat" className={cn("sidebar-link", isActive("/chat") && "active")}>
              <MessageSquare className="h-4 w-4" />
              {!state.isCollapsed && <span>Chat</span>}
            </Link>

            <Link href="/dashboard" className={cn("sidebar-link", isActive("/dashboard") && "active")}>
              <LayoutDashboard className="h-4 w-4" />
              {!state.isCollapsed && <span>Dashboard</span>}
            </Link>

            <Link href="/dashboard/compare" className={cn("sidebar-link", isActive("/dashboard/compare") && "active")}>
              <Split className="h-4 w-4" />
              {!state.isCollapsed && <span>Compare</span>}
            </Link>

            <Link href="/knowledge" className={cn("sidebar-link", isActive("/knowledge") && "active")}>
              <FileText className="h-4 w-4" />
              {!state.isCollapsed && <span>Knowledge</span>}
            </Link>

            <Link href="/sandbox" className={cn("sidebar-link", isActive("/sandbox") && "active")}>
              <Boxes className="h-4 w-4" />
              {!state.isCollapsed && <span>Sandbox</span>}
            </Link>

            <Link href="/settings" className={cn("sidebar-link", isActive("/settings") && "active")}>
              <Settings className="h-4 w-4" />
              {!state.isCollapsed && <span>Settings</span>}
            </Link>
          </div>

          {/* Section Projects/Traces/Metrics */}
          <div className="mt-2 flex flex-col gap-1 border-t p-2">
            <Link
              href="/dashboard/projects"
              className={cn("sidebar-link", isActive("/dashboard/projects") && "active")}
            >
              <Grid className="h-4 w-4" />
              {!state.isCollapsed && <span>Projects</span>}
            </Link>

            <Link href="/dashboard/traces" className={cn("sidebar-link", isActive("/dashboard/traces") && "active")}>
              <LayoutDashboard className="h-4 w-4" />
              {!state.isCollapsed && <span>Traces</span>}
            </Link>

            <Link href="/dashboard/metrics" className={cn("sidebar-link", isActive("/dashboard/metrics") && "active")}>
              <BarChart2 className="h-4 w-4" />
              {!state.isCollapsed && <span>Metrics</span>}
            </Link>

            <Link href="/dashboard/mcp" className={cn("sidebar-link", isActive("/dashboard/mcp") && "active")}>
              <Cpu className="h-4 w-4" />
              {!state.isCollapsed && (
                <>
                  <span>MCP (Waitlist)</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-500" />
                </>
              )}
            </Link>
          </div>

          {/* Section Docs/Discord */}
          {!state.isCollapsed && (
            <div className="mt-2 flex flex-col gap-1 border-t p-2">
              <Link href="/docs" className={cn("sidebar-link", isActive("/docs") && "active")}>
                <FileText className="h-4 w-4" />
                <span>Docs</span>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-500" />
              </Link>

              <a href="https://discord.gg/numtema" target="_blank" rel="noopener noreferrer" className="sidebar-link">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.09 9.15C8.46 9.15 7.97 9.7 7.97 10.37C7.97 11.05 8.47 11.59 9.09 11.59C9.72 11.59 10.22 11.05 10.22 10.37C10.22 9.7 9.72 9.15 9.09 9.15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.91 9.15C14.28 9.15 13.78 9.7 13.78 10.37C13.78 11.05 14.28 11.59 14.91 11.59C15.54 11.59 16.03 11.05 16.03 10.37C16.03 9.7 15.53 9.15 14.91 9.15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.99 5.95C18.65 5.34 17.21 4.89 15.69 4.64C15.67 4.64 15.65 4.64 15.64 4.65C15.63 4.66 15.62 4.68 15.62 4.7C15.46 4.99 15.32 5.36 15.22 5.66C13.61 5.43 12 5.43 10.39 5.66C10.29 5.35 10.14 4.99 9.98 4.7C9.98 4.68 9.97 4.66 9.96 4.65C9.95 4.64 9.93 4.64 9.91 4.64C8.39 4.89 6.95 5.34 5.61 5.95C5.6 5.95 5.59 5.96 5.58 5.97C2.53 10.49 1.74 14.87 2.13 19.19C2.13 19.21 2.14 19.22 2.16 19.23C3.9 20.5 5.57 21.27 7.22 21.76C7.24 21.77 7.26 21.76 7.27 21.75C7.67 21.2 8.03 20.62 8.33 20.01C8.34 19.99 8.33 19.96 8.31 19.95C7.72 19.73 7.15 19.46 6.61 19.15C6.59 19.14 6.59 19.11 6.6 19.09C6.71 19.01 6.82 18.93 6.92 18.84C6.93 18.83 6.95 18.83 6.97 18.84C10.37 20.41 14.07 20.41 17.43 18.84C17.44 18.83 17.47 18.83 17.48 18.84C17.59 18.92 17.7 19.01 17.8 19.09C17.82 19.11 17.82 19.14 17.8 19.15C17.26 19.47 16.69 19.73 16.09 19.95C16.07 19.96 16.07 19.99 16.08 20.01C16.39 20.62 16.74 21.2 17.13 21.75C17.14 21.76 17.17 21.77 17.19 21.76C18.84 21.27 20.52 20.5 22.25 19.23C22.27 19.22 22.28 19.2 22.28 19.19C22.74 14.21 21.52 9.87 19.01 5.97C19.01 5.96 19 5.95 19.99 5.95ZM8.68 16.38C7.62 16.38 6.75 15.41 6.75 14.22C6.75 13.03 7.61 12.06 8.68 12.06C9.76 12.06 10.62 13.04 10.61 14.22C10.61 15.41 9.75 16.38 8.68 16.38ZM15.32 16.38C14.26 16.38 13.39 15.41 13.39 14.22C13.39 13.03 14.25 12.06 15.32 12.06C16.4 12.06 17.26 13.04 17.25 14.22C17.25 15.41 16.4 16.38 15.32 16.38Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Discord</span>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-500" />
              </a>
            </div>
          )}

          {/* Section utilisateur */}
          <div className="mt-auto flex flex-col gap-1 border-t p-2">
            {!state.isCollapsed ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lionel Numtema</span>
                    <span className="text-xs text-gray-500">v0.4.12</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <ThemeToggle />
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

// Export alternatif pour la compatibilité
export const Sidebar = DashboardSidebar
