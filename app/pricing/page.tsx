import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFooter } from "@/components/landing-footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="font-nasalization text-4xl gradient-text">Tarification simple et transparente</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choisissez le plan qui correspond à vos besoins. Tous les plans incluent l'accès à notre plateforme
                  complète.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {/* Free Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-nasalization text-xl">Free</h3>
                  <p className="text-muted-foreground">Pour commencer avec les agents IA</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/mois</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>2 agents maximum</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>100 traces par mois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Outils d'analyse basiques</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Support communautaire</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">S'inscrire gratuitement</Button>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-lg ring-2 ring-[#6C5CE7]">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-[#6C5CE7] bg-[#6C5CE7]/10 px-3 py-1 text-xs text-[#6C5CE7]">
                    Populaire
                  </div>
                  <h3 className="font-nasalization text-xl">Pro</h3>
                  <p className="text-muted-foreground">Pour les équipes professionnelles</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="ml-1 text-muted-foreground">/mois</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Agents illimités</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>1,000 traces par mois</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Outils d'analyse avancés</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Support par email</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Intégration avec des sources de données</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">Commencer l'essai</Button>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-nasalization text-xl">Enterprise</h3>
                  <p className="text-muted-foreground">Pour les grandes organisations</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">Personnalisé</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Tout ce qui est inclus dans Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Traces illimitées</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Déploiement sur site disponible</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Support dédié 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>SLA garantis</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-background text-foreground hover:bg-muted border border-input">
                  Contacter les ventes
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
