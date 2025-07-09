import Link from "next/link"
import { LionIcon } from "@/components/lion-icon"

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <LionIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Nümtema Studio</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nümtema Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
