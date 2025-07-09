export function LandingIntegrations() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 fade-in">
            <h2 className="font-nasalization text-3xl gradient-text md:text-4xl/tight">One SDK. Many integrations.</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Native integrations with the top agent frameworks
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Centre avec logo Nümtema et fonctionnalités */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e779c1] to-[#6c5ce7] shadow-lg pulse-glow">
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 rotate-slow"
                >
                  <path d="M8.5 2a6.5 6.5 0 0 1 6.5 6.5c0 1.7-.7 3.4-2 4.5a5 5 0 0 1 2 4v2a3 3 0 0 1-6 0v-2c0-1.7.7-3.4 2-4.5a6.5 6.5 0 0 1-2.5-5.1 5 5 0 0 1-4-2.9A6.5 6.5 0 0 1 8.5 2Z" />
                </svg>
              </div>
            </div>

            {/* Fonctionnalités autour du centre */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-md hover:shadow-lg transition-shadow">
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
                      className="h-6 w-6 text-[#6c5ce7]"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <span className="mt-2 text-sm font-medium">Analytics</span>
                </div>
                <div className="flex flex-col items-center slide-up" style={{ animationDelay: "0.4s" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-md hover:shadow-lg transition-shadow">
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
                      className="h-6 w-6 text-[#6c5ce7]"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1" />
                      <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1" />
                    </svg>
                  </div>
                  <span className="mt-2 text-sm font-medium">Evals</span>
                </div>
                <div className="flex flex-col items-center slide-up" style={{ animationDelay: "0.6s" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-md hover:shadow-lg transition-shadow">
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
                      className="h-6 w-6 text-[#6c5ce7]"
                    >
                      <path d="M12 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M12 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                      <path d="M12 10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z" />
                    </svg>
                  </div>
                  <span className="mt-2 text-sm font-medium">Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Intégrations disposées en cercle avec animations */}
          <div className="relative h-96">
            {/* OpenAI - Top */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
                    <path
                      fill="currentColor"
                      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">OpenAI</div>
                  <div className="text-sm text-muted-foreground">Agents SDK</div>
                </div>
              </div>
            </div>

            {/* CrewAI - Top Right */}
            <div className="absolute right-0 top-8 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                  <span className="text-lg font-bold text-white">C</span>
                </div>
                <div>
                  <div className="font-semibold">CrewAI</div>
                  <div className="text-sm text-muted-foreground">Multi-Agent</div>
                </div>
              </div>
            </div>

            {/* AutoGen - Left */}
            <div className="absolute left-0 top-8 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
                    <rect x="3" y="3" width="6" height="6" fill="currentColor" />
                    <rect x="15" y="3" width="6" height="6" fill="currentColor" />
                    <rect x="3" y="15" width="6" height="6" fill="currentColor" />
                    <rect x="15" y="15" width="6" height="6" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">AutoGen</div>
                  <div className="text-sm text-muted-foreground">Microsoft</div>
                </div>
              </div>
            </div>

            {/* LlamaIndex - Right */}
            <div className="absolute bottom-8 right-0 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                  <span className="text-lg font-bold text-white">L</span>
                </div>
                <div>
                  <div className="font-semibold">LlamaIndex</div>
                  <div className="text-sm text-muted-foreground">RAG Framework</div>
                </div>
              </div>
            </div>

            {/* CAMEL-AI - Bottom Left */}
            <div className="absolute bottom-8 left-0 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-lg font-bold text-white">🐪</span>
                </div>
                <div>
                  <div className="font-semibold">CAMEL-AI</div>
                  <div className="text-sm text-muted-foreground">Communicative</div>
                </div>
              </div>
            </div>

            {/* LangChain - Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 integration-card">
              <div className="flex h-20 w-48 items-center gap-3 rounded-2xl bg-background p-4 shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
                    <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">LangChain</div>
                  <div className="text-sm text-muted-foreground">Framework</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
