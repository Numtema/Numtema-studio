export function LandingPartners() {
  return (
    <section className="w-full py-12 md:py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-center text-sm text-muted-foreground">
            Trusted by thousands of engineers building reliable agents
          </p>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 items-center opacity-60">
            {/* Placeholder logos - you can replace with actual partner logos */}
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">AMADEUS</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">CISCO</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">Microsoft</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">Samsung</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">Uber</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 w-24 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">Spotify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
