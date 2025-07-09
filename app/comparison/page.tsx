import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFooter } from "@/components/landing-footer"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function ComparisonPage() {
  const features = [
    {
      category: "Core Features",
      items: [
        { name: "Multi-Agent Orchestration", numtema: true, competitor1: true, competitor2: false },
        { name: "Real-time Monitoring", numtema: true, competitor1: true, competitor2: true },
        { name: "Cost Tracking (400+ LLMs)", numtema: true, competitor1: false, competitor2: false },
        { name: "Agent Debugging Tools", numtema: true, competitor1: true, competitor2: false },
        { name: "Performance Analytics", numtema: true, competitor1: true, competitor2: true },
      ],
    },
    {
      category: "Integrations",
      items: [
        { name: "OpenAI Agents SDK", numtema: true, competitor1: true, competitor2: true },
        { name: "CrewAI", numtema: true, competitor1: false, competitor2: true },
        { name: "AutoGen", numtema: true, competitor1: true, competitor2: false },
        { name: "LangChain", numtema: true, competitor1: true, competitor2: true },
        { name: "LlamaIndex", numtema: true, competitor1: false, competitor2: true },
        { name: "CAMEL-AI", numtema: true, competitor1: false, competitor2: false },
      ],
    },
    {
      category: "Enterprise Features",
      items: [
        { name: "SSO Integration", numtema: true, competitor1: true, competitor2: false },
        { name: "On-premise Deployment", numtema: true, competitor1: false, competitor2: false },
        { name: "Custom Data Retention", numtema: true, competitor1: true, competitor2: false },
        { name: "SOC-2 Compliance", numtema: true, competitor1: true, competitor2: false },
        { name: "24/7 Support", numtema: true, competitor1: true, competitor2: false },
      ],
    },
    {
      category: "Pricing",
      items: [
        { name: "Free Tier Available", numtema: true, competitor1: true, competitor2: false },
        { name: "Pay-as-you-scale", numtema: true, competitor1: false, competitor2: true },
        { name: "No Setup Fees", numtema: true, competitor1: true, competitor2: false },
        { name: "Transparent Pricing", numtema: true, competitor1: false, competitor2: true },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-[#e779c1]/10 to-[#6c5ce7]/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center hero-animation">
              <h1 className="font-nasalization text-4xl gradient-text md:text-5xl/tight">Why Choose Nümtema Studio?</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See how Nümtema Studio compares to other AI agent platforms and why developers choose us.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="p-4">
                    <h3 className="font-nasalization text-lg">Features</h3>
                  </div>
                  <div className="p-4 text-center bg-gradient-to-br from-[#e779c1]/10 to-[#6c5ce7]/10 rounded-xl">
                    <div className="space-y-2">
                      <h3 className="font-nasalization text-lg gradient-text">Nümtema Studio</h3>
                      <p className="text-sm text-muted-foreground">Our Platform</p>
                      <Button className="w-full bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white">Get Started</Button>
                    </div>
                  </div>
                  <div className="p-4 text-center border rounded-xl">
                    <div className="space-y-2">
                      <h3 className="font-nasalization text-lg">Competitor A</h3>
                      <p className="text-sm text-muted-foreground">Alternative Platform</p>
                      <Button variant="outline" className="w-full">
                        Compare
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 text-center border rounded-xl">
                    <div className="space-y-2">
                      <h3 className="font-nasalization text-lg">Competitor B</h3>
                      <p className="text-sm text-muted-foreground">Another Option</p>
                      <Button variant="outline" className="w-full">
                        Compare
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Feature Categories */}
                {features.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-8">
                    <h4 className="font-nasalization text-xl mb-4 gradient-text">{category.category}</h4>
                    <div className="space-y-2">
                      {category.items.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="grid grid-cols-4 gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-center">
                            {feature.numtema ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </div>
                          <div className="text-center">
                            {feature.competitor1 ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </div>
                          <div className="text-center">
                            {feature.competitor2 ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-nasalization text-3xl gradient-text mb-4">Why Developers Choose Nümtema Studio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform is built by developers, for developers. Here's what sets us apart.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4 feature-card p-6 rounded-xl border bg-background">
                <div className="w-12 h-12 bg-[#6c5ce7]/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-nasalization text-xl">Lightning Fast Setup</h3>
                <p className="text-muted-foreground">
                  Get started in minutes with our one-line SDK integration. No complex configuration required.
                </p>
              </div>

              <div className="text-center space-y-4 feature-card p-6 rounded-xl border bg-background">
                <div className="w-12 h-12 bg-[#6c5ce7]/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-nasalization text-xl">Production Ready</h3>
                <p className="text-muted-foreground">
                  Built for scale with enterprise-grade security, monitoring, and reliability features.
                </p>
              </div>

              <div className="text-center space-y-4 feature-card p-6 rounded-xl border bg-background">
                <div className="w-12 h-12 bg-[#6c5ce7]/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-[#6c5ce7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-nasalization text-xl">Community Driven</h3>
                <p className="text-muted-foreground">
                  Join thousands of developers building the future of AI agents together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="font-nasalization text-3xl gradient-text">Ready to Get Started?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who trust Nümtema Studio for their AI agent development.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
