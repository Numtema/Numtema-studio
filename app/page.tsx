import { LandingNavbar } from "@/components/landing-navbar"
import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingTestimonials } from "@/components/landing-testimonials"
import { LandingPricing } from "@/components/landing-pricing"
import { LandingPartners } from "@/components/landing-partners"
import { LandingIntegrations } from "@/components/landing-integrations"
import { LandingCTA } from "@/components/landing-cta"
import { LandingFooter } from "@/components/landing-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingPricing />
      <LandingPartners />
      <LandingIntegrations />
      <LandingCTA />
      <LandingFooter />
    </div>
  )
}
