"use client"

import { useState, useEffect, useRef } from "react"
import { useAgent } from "@/components/AgentProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatWindowProps {
  className?: string
}

export function ChatWindow({ className }: ChatWindowProps) {
  const { currentAgent, isLoading } = useAgent()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simuler le chargement de l'historique
  useEffect(() => {
    if (!currentAgent) return

    setIsLocalLoading(true)

    // Simuler un appel API
    setTimeout(() => {
      const initialMessages: Message[] = [
        {
          id: "1",
          role: "user",
          content: "Bonjour, pouvez-vous m'aider avec une analyse de données ?",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "2",
          role: "assistant",
          content: `Bonjour ! Je suis ${currentAgent.name}, ${currentAgent.backstory}. Je serais ravi de vous aider avec votre analyse de données. Pourriez-vous me donner plus de détails sur le type de données que vous souhaitez analyser ?`,
          timestamp: new Date(Date.now() - 3500000).toISOString(),
        },
        {
          id: "3",
          role: "user",
          content: "J'ai des données de ventes mensuelles et j'aimerais identifier des tendances.",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: "4",
          role: "assistant",
          content:
            "Excellent ! Pour identifier des tendances dans vos données de ventes mensuelles, je vous recommande de commencer par visualiser les données sur un graphique linéaire pour observer les variations au fil du temps. Ensuite, nous pourrions calculer des moyennes mobiles pour lisser les fluctuations et mieux voir les tendances. Avez-vous déjà préparé ces données dans un format particulier ?",
          timestamp: new Date(Date.now() - 1700000).toISOString(),
        },
      ]

      setMessages(initialMessages)
      setIsLocalLoading(false)
    }, 1000)
  }, [currentAgent])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isLocalLoading || isLoading) {
    return (
      <div className={cn("space-y-4 p-4", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/4 bg-muted rounded" />
              <div className="h-20 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!currentAgent) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">Aucun agent sélectionné</h3>
          <p className="text-muted-foreground">Veuillez sélectionner un agent pour commencer la conversation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 p-4", className)}>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start gap-3 animate-fade-in",
            message.role === "user" ? "justify-end" : "justify-start",
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {message.role === "assistant" && (
            <Avatar>
              <AvatarFallback>{currentAgent.id}</AvatarFallback>
              <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} />
            </Avatar>
          )}
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%]",
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs text-muted-foreground mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
          </div>
          {message.role === "user" && (
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/user-avatar.png" />
            </Avatar>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
