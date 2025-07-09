"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getAgentMeta } from "@/components/AgentProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Database, MessageCircle, BarChart3 } from "lucide-react"

interface AgentCompareProps {
  agent: string
}

export function AgentCompare({ agent }: AgentCompareProps) {
  const [agentData, setAgentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  // Charger les données de l'agent
  useEffect(() => {
    try {
      setIsLoading(true)
      setError(null)

      const meta = getAgentMeta(agent)
      if (!meta) {
        setError(`Agent ${agent} non trouvé`)
        setIsLoading(false)
        return
      }

      setAgentData(meta)

      // Initialiser une conversation simulée
      setConversation([
        {
          role: "user",
          content: "Comment puis-je améliorer l'engagement sur les réseaux sociaux ?",
        },
        {
          role: "assistant",
          content: getSimulatedResponse(agent),
        },
      ])

      setIsLoading(false)
    } catch (err) {
      setError(`Erreur lors du chargement de l'agent ${agent}`)
      setIsLoading(false)
    }
  }, [agent])

  const getSimulatedResponse = (agentId: string) => {
    const responses: Record<string, string> = {
      A: "En tant qu'analyste, je recommande d'analyser vos métriques d'engagement actuelles. Selon les données, les publications avec des visuels ont 2,3 fois plus d'engagement. Je suggère d'augmenter votre contenu visuel de 35% à 60%.",
      B: "En tant qu'assistant, je vous suggère de publier du contenu interactif comme des sondages et des questions, d'utiliser des visuels attrayants, et de maintenir une présence régulière. Engagez-vous avec votre audience en répondant aux commentaires rapidement.",
      C: "En tant que créatif, je recommande de créer du contenu qui suscite l'émotion et encourage le partage. Les vidéos courtes, les infographies et les stories interactives fonctionnent particulièrement bien pour augmenter l'engagement.",
    }
    return responses[agentId] || "Réponse par défaut de l'agent."
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Ajouter le message de l'utilisateur
    const newConversation = [...conversation, { role: "user", content: message }]
    setConversation(newConversation)

    // Simuler une réponse de l'agent
    setTimeout(() => {
      const response = getSimulatedResponse(agent)
      setConversation((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)

    setMessage("")
  }

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-24 mb-2"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="font-nasalization text-red-500">Erreur</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!agentData) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Agent non disponible</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-nasalization">Agent {agent}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
              <MessageCircle className="h-3 w-3" />
            </Badge>
            <Badge variant="default" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
              <Database className="h-3 w-3" />
            </Badge>
            <Badge variant="default" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
              <BarChart3 className="h-3 w-3" />
            </Badge>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{agentData.name}</div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              Chat
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex-1">
              Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col mt-2">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-64">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#6C5CE7] text-white">{agent}</AvatarFallback>
                      <AvatarImage src={agentData.avatar || "/placeholder.svg"} />
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                      msg.role === "user" ? "bg-[#6C5CE7] text-white" : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Envoyer un message..."
                className="min-h-10 resize-none"
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="metrics" className="flex-1 mt-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border rounded-md">
                  <div className="text-xs text-muted-foreground">Temps de réponse</div>
                  <div className="text-lg font-bold">{agent === "A" ? "1.2s" : agent === "B" ? "1.8s" : "1.5s"}</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-xs text-muted-foreground">Taux de réussite</div>
                  <div className="text-lg font-bold">{agent === "A" ? "94%" : agent === "B" ? "98%" : "96%"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Scores QA</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Précision</span>
                    <span>{agent === "A" ? "88%" : agent === "B" ? "92%" : "90%"}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-[#6C5CE7] h-1.5 rounded-full"
                      style={{ width: agent === "A" ? "88%" : agent === "B" ? "92%" : "90%" }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Pertinence</span>
                    <span>{agent === "A" ? "90%" : agent === "B" ? "95%" : "92%"}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-[#6C5CE7] h-1.5 rounded-full"
                      style={{ width: agent === "A" ? "90%" : agent === "B" ? "95%" : "92%" }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Utilité</span>
                    <span>{agent === "A" ? "92%" : agent === "B" ? "90%" : "94%"}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-[#6C5CE7] h-1.5 rounded-full"
                      style={{ width: agent === "A" ? "92%" : agent === "B" ? "90%" : "94%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
