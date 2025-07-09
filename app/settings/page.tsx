import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Settings, Key, Bot, Database, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-nasalization gradient-text">Paramètres</h1>

      <Tabs defaultValue="api" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="agents">
            <Bot className="h-4 w-4 mr-2" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal">Configuration des API</CardTitle>
              <CardDescription>Configurez les clés API pour les différents services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input id="openai-key" type="password" placeholder="sk-..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="llm-model">Modèle LLM</Label>
                  <Select defaultValue="gpt-4o">
                    <SelectTrigger id="llm-model">
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-api">API Voix</Label>
                  <Select defaultValue="elevenlabs">
                    <SelectTrigger id="voice-api">
                      <SelectValue placeholder="Sélectionner un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      <SelectItem value="openai">OpenAI Voice</SelectItem>
                      <SelectItem value="azure">Azure Speech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-api-key">Clé API Voix</Label>
                  <Input id="voice-api-key" type="password" placeholder="Votre clé API" />
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

        <TabsContent value="agents" className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal flex items-center justify-between">
                <div>Configuration des agents</div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Actualiser
                </Button>
              </CardTitle>
              <CardDescription>Gérez les paramètres des agents IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Agent A */}
                <div className="space-y-4 pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Agent A</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="agent-a-active" defaultChecked />
                      <Label htmlFor="agent-a-active">Actif</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-a-model">Modèle</Label>
                      <Select defaultValue="gpt-4o">
                        <SelectTrigger id="agent-a-model">
                          <SelectValue placeholder="Sélectionner un modèle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agent-a-temperature">Température</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="agent-a-temperature"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          defaultValue="0.7"
                          className="w-full"
                        />
                        <span className="text-sm w-8">0.7</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Outils activés</Label>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-a-tool-rag" defaultChecked />
                        <Label htmlFor="agent-a-tool-rag">RAG</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-a-tool-analytics" defaultChecked />
                        <Label htmlFor="agent-a-tool-analytics">Analytics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-a-tool-voice" />
                        <Label htmlFor="agent-a-tool-voice">Voice</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent B */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Agent B</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="agent-b-active" defaultChecked />
                      <Label htmlFor="agent-b-active">Actif</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-b-model">Modèle</Label>
                      <Select defaultValue="claude-3-sonnet">
                        <SelectTrigger id="agent-b-model">
                          <SelectValue placeholder="Sélectionner un modèle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                          <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agent-b-temperature">Température</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="agent-b-temperature"
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          defaultValue="0.5"
                          className="w-full"
                        />
                        <span className="text-sm w-8">0.5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Outils activés</Label>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-b-tool-rag" defaultChecked />
                        <Label htmlFor="agent-b-tool-rag">RAG</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-b-tool-analytics" defaultChecked />
                        <Label htmlFor="agent-b-tool-analytics">Analytics</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="agent-b-tool-voice" defaultChecked />
                        <Label htmlFor="agent-b-tool-voice">Voice</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button className="bg-[#191222] text-white hover:bg-[#191222]/90 rounded-md font-normal">
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal">Paramètres système</CardTitle>
              <CardDescription>Configurez les paramètres globaux du système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="database-url">URL de la base de données</Label>
                  <div className="flex items-center gap-2">
                    <Input id="database-url" defaultValue="postgresql://user:password@localhost:5432/multiagents" />
                    <Button variant="outline" size="icon">
                      <Database className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Options système</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-tracing" defaultChecked />
                      <Label htmlFor="enable-tracing">Activer le tracing OpenTelemetry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-metrics" defaultChecked />
                      <Label htmlFor="enable-metrics">Activer les métriques Prometheus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-audit" defaultChecked />
                      <Label htmlFor="enable-audit">Activer l'audit logging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-learning" />
                      <Label htmlFor="enable-learning">Activer l'apprentissage continu</Label>
                    </div>
                  </div>
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
