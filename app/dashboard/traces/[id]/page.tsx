import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, DollarSign, Zap } from "lucide-react"
import Link from "next/link"

export default function TraceDetailPage({ params }: { params: { id: string } }) {
  // Données simulées pour la trace
  const trace = {
    id: params.id,
    name: "Customer Support Inquiry",
    status: "success",
    startTime: "2025-05-23T14:32:15Z",
    endTime: "2025-05-23T14:32:18Z",
    duration: "3.2s",
    cost: "$0.0045",
    tokens: {
      input: 156,
      output: 89,
      total: 245,
    },
    agent: "Community Manager",
    model: "gpt-4o",
    user: "user_123",
  }

  const steps = [
    {
      id: 1,
      name: "Input Processing",
      status: "success",
      duration: "0.1s",
      timestamp: "14:32:15.123",
      details: "User input received and validated",
    },
    {
      id: 2,
      name: "Context Retrieval",
      status: "success",
      duration: "0.8s",
      timestamp: "14:32:15.223",
      details: "Retrieved relevant context from knowledge base",
    },
    {
      id: 3,
      name: "LLM Generation",
      status: "success",
      duration: "2.1s",
      timestamp: "14:32:16.023",
      details: "Generated response using GPT-4o",
    },
    {
      id: 4,
      name: "Response Validation",
      status: "success",
      duration: "0.2s",
      timestamp: "14:32:18.123",
      details: "Response validated and formatted",
    },
  ]

  const logs = [
    {
      timestamp: "14:32:15.123",
      level: "INFO",
      message: "Trace started for user_123",
      component: "TraceManager",
    },
    {
      timestamp: "14:32:15.223",
      level: "DEBUG",
      message: "Retrieved 3 relevant documents from knowledge base",
      component: "RAGRetriever",
    },
    {
      timestamp: "14:32:16.023",
      level: "INFO",
      message: "LLM request sent with 156 input tokens",
      component: "LLMProvider",
    },
    {
      timestamp: "14:32:18.123",
      level: "INFO",
      message: "Response generated with 89 output tokens",
      component: "LLMProvider",
    },
    {
      timestamp: "14:32:18.323",
      level: "INFO",
      message: "Trace completed successfully",
      component: "TraceManager",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/traces">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-nasalization gradient-text">Détails de la trace</h1>
          <p className="text-sm text-muted-foreground">ID: {trace.id}</p>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">Statut</CardTitle>
            <Badge variant={trace.status === "success" ? "default" : "destructive"} className="bg-green-500">
              {trace.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trace.name}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">Durée</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trace.duration}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">Coût</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trace.cost}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">Tokens</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trace.tokens.total}</div>
            <p className="text-xs text-muted-foreground">
              {trace.tokens.input} in, {trace.tokens.output} out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Détails de la trace */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization">Timeline d'exécution</CardTitle>
              <CardDescription>Étapes détaillées de l'exécution de la trace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${step.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      {index < steps.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{step.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{step.duration}</span>
                          <span>{step.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization">Logs d'exécution</CardTitle>
              <CardDescription>Messages détaillés de l'exécution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-2 rounded border">
                    <span className="text-muted-foreground">{log.timestamp}</span>
                    <Badge
                      variant={log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {log.level}
                    </Badge>
                    <span className="text-muted-foreground">[{log.component}]</span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-nasalization">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Agent</span>
                  <span className="text-sm text-muted-foreground">{trace.agent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Modèle</span>
                  <span className="text-sm text-muted-foreground">{trace.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Utilisateur</span>
                  <span className="text-sm text-muted-foreground">{trace.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Début</span>
                  <span className="text-sm text-muted-foreground">{new Date(trace.startTime).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Fin</span>
                  <span className="text-sm text-muted-foreground">{new Date(trace.endTime).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-nasalization">Utilisation des tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Tokens d'entrée</span>
                  <span className="text-sm text-muted-foreground">{trace.tokens.input}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Tokens de sortie</span>
                  <span className="text-sm text-muted-foreground">{trace.tokens.output}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm text-muted-foreground">{trace.tokens.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Coût total</span>
                  <span className="text-sm text-muted-foreground">{trace.cost}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization">Analyse de performance</CardTitle>
              <CardDescription>Métriques détaillées de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">98.5%</div>
                    <div className="text-sm text-muted-foreground">Taux de réussite</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">1.2s</div>
                    <div className="text-sm text-muted-foreground">Temps de réponse moyen</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">245</div>
                    <div className="text-sm text-muted-foreground">Tokens par requête</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Temps de traitement</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[#6c5ce7] h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Efficacité des tokens</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
