import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function LandingPricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-nasalization text-3xl gradient-text md:text-4xl/tight">Pricing</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Free to get started. Flexibility at scale.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {/* Basic Plan */}
          <div className="flex flex-col rounded-2xl border bg-background p-8 shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Basic</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-2 text-muted-foreground">per month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Free up to 1,000 events</p>
              </div>

              <Button className="w-full bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white">Start for Free</Button>

              <div className="space-y-4">
                <h4 className="font-medium">Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Agent Agnostic SDK</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">LLM Cost Tracking (400+ LLMs)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Replay Analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-2xl border-2 border-[#6c5ce7] bg-slate-900 p-8 shadow-lg text-white">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="rounded-full bg-[#6c5ce7] px-3 py-1 text-xs font-medium text-white">Most Popular</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <span className="text-sm text-gray-300">starts at</span>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$40</span>
                  <span className="ml-2 text-gray-300">per month</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">Up to 10,000 events</p>
              </div>

              <Button className="w-full bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white">Upgrade</Button>

              <div className="space-y-4">
                <h4 className="font-medium">Everything in Basic plus:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Increased event limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Unlimited log retention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Session and event export</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Dedicated Slack and email support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Role-based permissioning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-2xl border bg-background p-8 shadow-sm">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Enterprise</h3>
                  <span className="text-sm text-muted-foreground">starts at</span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Going beyond? Let's chat</p>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#6c5ce7] text-[#6c5ce7] hover:bg-[#6c5ce7] hover:text-white"
              >
                Get a Demo
              </Button>

              <div className="space-y-4">
                <h4 className="font-medium">Everything in Pro plus:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">SLA</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Slack Connect</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Custom SSO</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">On-premise deployment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Custom data retention policy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">Self-hosting (AWS, GCP, Azure)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm">SOC-2, HIPAA, NIST AI RMF</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
