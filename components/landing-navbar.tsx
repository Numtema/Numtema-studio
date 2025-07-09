"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LionIcon } from "@/components/lion-icon"
import { Github, Twitter } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LionIcon className="h-6 w-6" />
          <span className="text-base font-nasalization">Nümtema Studio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/blog" className="text-sm font-normal hover:text-foreground/80">
            Blog
          </Link>
          <Link href="/contact" className="text-sm font-normal hover:text-foreground/80">
            Contact us
          </Link>
          <Link href="/pricing" className="text-sm font-normal hover:text-foreground/80">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-normal hover:text-foreground/80">
            Docs
          </Link>
          <Link href="/courses" className="text-sm font-normal hover:text-foreground/80">
            Courses
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="https://github.com/numtema-studio" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://twitter.com/numtema" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="default"
              className="bg-[#6C5CE7] text-white hover:bg-[#6C5CE7]/90 rounded-md text-sm font-normal h-9"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
