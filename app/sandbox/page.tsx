import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Boxes, Code, Play, Save, RefreshCw } from "lucide-react"

export default function SandboxPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-nasalization gradient-text">Sandbox</h1>

      <Tabs defaultValue="debugger" className="space-y-4">
        <TabsList>
          <TabsTrigger value="debugger">
            <Code className="h-4 w-4 mr-2" />
            Context Debugger
          </TabsTrigger>
          <TabsTrigger value="learning">
            <Boxes className="h-4 w-4 mr-2" />
            Active Learning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="debugger" className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal flex items-center justify-between">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                  Agent Context Debugger
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Actualiser
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>État de la mémoire à court terme</Label>
                    <Textarea
                      readOnly
                      className="font-mono text-xs h-40"
                      value={`{
  "conversation": [
    {"role": "user", "content": "Bonjour, comment ça va ?"},
    {"role": "assistant", "content": "Je vais bien, merci ! Comment puis-je vous aider aujourd'hui ?"}
  ],
  "context": {
    "lastUpdated": "2023-05-23T14:28:07Z",
    "userPreferences": {
      "language": "fr",
      "expertise": "beginner"
    }
  }
}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>État de la mémoire à long terme</Label>
                    <Textarea
                      readOnly
                      className="font-mono text-xs h-40"
                      value={`{
  "userProfile": {
    "interests": ["finance", "technology", "data analysis"],
    "frequentQueries": ["market trends", "financial reports", "data visualization"],
    "preferredResponseStyle": "detailed"
  },
  "knowledgeBase": {
    "lastSyncedDocuments": ["financial_report_q1.pdf", "market_analysis_2023.docx"],
    "customInstructions": "Focus on financial implications and provide data-driven insights"
  }
}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Événements récents</Label>
                  <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="text-xs p-2 border-l-2 border-blue-500 bg-muted/50">
                        <div className="font-medium">MemoryUpdateEvent</div>
                        <div className="text-muted-foreground">2023-05-23T14:28:07Z</div>
                      </div>
                      <div className="text-xs p-2 border-l-2 border-green-500 bg-muted/50">
                        <div className="font-medium">UserQueryProcessedEvent</div>
                        <div className="text-muted-foreground">2023-05-23T14:27:55Z</div>
                      </div>
                      <div className="text-xs p-2 border-l-2 border-orange-500 bg-muted/50">
                        <div className="font-medium">KnowledgeBaseSyncEvent</div>
                        <div className="text-muted-foreground">2023-05-23T14:25:30Z</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline">Exporter JSON</Button>
                  <Button className="bg-[#191222] text-white hover:bg-[#191222]/90 rounded-md font-normal">
                    <Play className="h-4 w-4 mr-2" />
                    Tester avec cet état
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal flex items-center justify-between">
                <div className="flex items-center">
                  <Boxes className="h-4 w-4 mr-2 text-muted-foreground" />
                  Active Learning Node
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Question d'entraînement</Label>
                  <Input defaultValue="Quelles sont les tendances actuelles du marché financier ?" />
                </div>

                <div className="space-y-2">
                  <Label>Réponse idéale</Label>
                  <Textarea
                    className="min-h-32"
                    defaultValue="Les tendances actuelles du marché financier incluent une augmentation des investissements dans les technologies vertes, une volatilité accrue des cryptomonnaies, et un intérêt croissant pour les investissements ESG (Environnementaux, Sociaux et de Gouvernance). Les taux d'intérêt sont en hausse dans plusieurs économies majeures pour contrer l'inflation, ce qui affecte les marchés obligataires. Le secteur technologique continue de montrer une forte croissance, particulièrement dans l'IA et le cloud computing."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Input defaultValue="Finance" />
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulté</Label>
                    <div className="flex items-center justify-between">
                      <Input defaultValue="3" type="number" min="1" max="5" className="w-20" />
                      <span className="text-sm text-muted-foreground">sur 5</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="add-to-training" />
                  <Label htmlFor="add-to-training">Ajouter à l'ensemble d'entraînement</Label>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline">Annuler</Button>
                  <Button className="bg-[#191222] text-white hover:bg-[#191222]/90 rounded-md font-normal">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
