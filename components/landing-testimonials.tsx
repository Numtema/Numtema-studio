export function LandingTestimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Témoignages</div>
            <h2 className="font-nasalization text-3xl gradient-text">Ce que disent nos clients</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Découvrez comment Nümtema Studio aide les entreprises à construire des agents IA fiables et performants.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start space-y-4 rounded-lg border bg-background p-6">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-[#6C5CE7]"></div>
              <div>
                <h3 className="text-lg font-medium">Sarah L.</h3>
                <p className="text-sm text-muted-foreground">CTO, TechCorp</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "Nümtema Studio nous a permis de déployer des agents IA fiables en production en un temps record. La
              plateforme d'observabilité est incroyable."
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border bg-background p-6">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-[#6C5CE7]"></div>
              <div>
                <h3 className="text-lg font-medium">Marc D.</h3>
                <p className="text-sm text-muted-foreground">Lead Developer, AI Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "La capacité à tracer et déboguer nos agents en temps réel a considérablement amélioré notre cycle de
              développement. Un outil indispensable."
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border bg-background p-6">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-[#6C5CE7]"></div>
              <div>
                <h3 className="text-lg font-medium">Julie M.</h3>
                <p className="text-sm text-muted-foreground">Product Manager, StartupX</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              "Grâce à Nümtema Studio, nous avons pu créer un système multi-agents complexe qui a transformé notre
              service client. Hautement recommandé!"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
