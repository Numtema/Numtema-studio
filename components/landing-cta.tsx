import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#e779c1]/10 to-[#6c5ce7]/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-nasalization text-3xl gradient-text md:text-4xl/tight">
              Ready to build reliable AI agents?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of developers who trust Nümtema Studio to trace, debug, and deploy their AI agents.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-12 px-8 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white rounded-md font-normal"
              >
                Start Building for Free
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white rounded-md font-normal"
              >
                View Documentation
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            No credit card required • Free tier available • Enterprise support
          </p>
        </div>
      </div>
    </section>
  )
}
