import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Agency raises $2.6M</div>
            <h1 className="font-nasalization text-[60px] leading-[60px] tracking-tight gradient-text">
              Trace, Debug, & Deploy
              <br />
              Reliable AI Agents.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-normal">
              The leading developer platform for building AI agents and LLM apps.
              <br />
              Agent observability for OpenAI, CrewAI, Autogen, and 400+ LLMs and frameworks.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <div className="relative">
              <div className="flex h-10 items-center rounded-md border bg-muted px-4 py-2">
                <code className="text-sm text-green-500">pip install numtema</code>
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10">
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
                    <rect width="8" height="8" x="8" y="8" rx="1" />
                    <path d="M16 8V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1" />
                    <path d="M8 16v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1" />
                  </svg>
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-10 px-8 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white rounded-md font-normal"
              >
                Start for Free →
              </Button>
            </Link>
            <Link href="https://github.com/numtema-studio" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-10 px-8 border-[#191222]/20 text-[#191222] rounded-md font-normal"
              >
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                4,435+
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">Powering thousands of engineers building reliable agents</p>
        </div>
      </div>
    </section>
  )
}
