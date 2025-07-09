"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useAuth } from "./AuthProvider"

export interface AgentMeta {
  id: string
  name: string
  description: string
  model: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  capabilities?: string[]
  tools?: {
    rag?: boolean
    analytics?: boolean
    webSearch?: boolean
  }
  memory?: {
    shortTerm?: boolean
    longTerm?: boolean
  }
  avatar?: string
}

// Agents par défaut
const defaultAgents: AgentMeta[] = [
  {
    id: "A",
    name: "Agent Analyste",
    description: "Spécialisé dans l'analyse de données et les insights business",
    model: "gpt-4",
    systemPrompt: "Tu es un expert en analyse de données.",
    temperature: 0.3,
    maxTokens: 2000,
    capabilities: ["Analyse de données", "Visualisation", "Reporting"],
    tools: { analytics: true, rag: true, webSearch: false },
    memory: { shortTerm: true, longTerm: true },
    avatar: "/agents/analyst.png",
  },
  {
    id: "B",
    name: "Agent Assistant",
    description: "Assistant polyvalent pour les tâches quotidiennes",
    model: "gpt-3.5-turbo",
    systemPrompt: "Tu es un assistant personnel efficace.",
    temperature: 0.7,
    maxTokens: 1500,
    capabilities: ["Support client", "Gestion de tâches", "Communication"],
    tools: { analytics: false, rag: true, webSearch: true },
    memory: { shortTerm: true, longTerm: false },
    avatar: "/agents/assistant.png",
  },
  {
    id: "C",
    name: "Agent Créatif",
    description: "Spécialisé dans la création de contenu et le design",
    model: "gpt-4",
    systemPrompt: "Tu es un créatif expérimenté.",
    temperature: 0.9,
    maxTokens: 2500,
    capabilities: ["Création de contenu", "Design", "Marketing"],
    tools: { analytics: false, rag: true, webSearch: true },
    memory: { shortTerm: true, longTerm: true },
    avatar: "/agents/creative.png",
  },
]

interface AgentContextType {
  currentAgent: AgentMeta | null
  setCurrentAgent: (agentId: string) => void
  isLoading: boolean
  agents: AgentMeta[]
  createAgent: (agent: Omit<AgentMeta, "id">) => Promise<AgentMeta>
  updateAgent: (agent: AgentMeta) => Promise<AgentMeta>
  removeAgent: (id: string) => Promise<boolean>
  refreshAgents: () => Promise<void>
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [currentAgent, setCurrentAgentState] = useState<AgentMeta | null>(defaultAgents[0])
  const [agents, setAgents] = useState<AgentMeta[]>(defaultAgents)
  const [isLoading, setIsLoading] = useState(false)

  const setCurrentAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId)
    if (agent) {
      setCurrentAgentState(agent)
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedAgentId", agentId)
      }
    }
  }

  const createAgent = async (agentData: Omit<AgentMeta, "id">): Promise<AgentMeta> => {
    const newAgent: AgentMeta = {
      ...agentData,
      id: Math.random().toString(36).substr(2, 9),
    }

    setAgents((prev) => [...prev, newAgent])

    // Sauvegarder dans localStorage si l'utilisateur est connecté
    if (isAuthenticated && typeof window !== "undefined") {
      const customAgents = [...agents.filter((a) => !defaultAgents.some((da) => da.id === a.id)), newAgent]
      localStorage.setItem("customAgents", JSON.stringify(customAgents))
    }

    return newAgent
  }

  const updateAgent = async (agent: AgentMeta): Promise<AgentMeta> => {
    setAgents((prev) => prev.map((a) => (a.id === agent.id ? agent : a)))

    if (currentAgent && currentAgent.id === agent.id) {
      setCurrentAgentState(agent)
    }

    // Sauvegarder dans localStorage si l'utilisateur est connecté
    if (isAuthenticated && typeof window !== "undefined") {
      const customAgents = agents.filter((a) => !defaultAgents.some((da) => da.id === a.id))
      localStorage.setItem("customAgents", JSON.stringify(customAgents))
    }

    return agent
  }

  const removeAgent = async (id: string): Promise<boolean> => {
    // Ne pas supprimer les agents par défaut
    if (defaultAgents.some((a) => a.id === id)) {
      return false
    }

    setAgents((prev) => prev.filter((a) => a.id !== id))

    if (currentAgent && currentAgent.id === id) {
      setCurrentAgentState(defaultAgents[0])
    }

    // Sauvegarder dans localStorage si l'utilisateur est connecté
    if (isAuthenticated && typeof window !== "undefined") {
      const customAgents = agents.filter((a) => !defaultAgents.some((da) => da.id === a.id) && a.id !== id)
      localStorage.setItem("customAgents", JSON.stringify(customAgents))
    }

    return true
  }

  const refreshAgents = async () => {
    // Charger les agents personnalisés depuis localStorage
    if (isAuthenticated && typeof window !== "undefined") {
      try {
        const customAgents = localStorage.getItem("customAgents")
        if (customAgents) {
          const parsed = JSON.parse(customAgents)
          setAgents([...defaultAgents, ...parsed])
        } else {
          setAgents(defaultAgents)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des agents:", error)
        setAgents(defaultAgents)
      }
    } else {
      setAgents(defaultAgents)
    }

    setCurrentAgentState(defaultAgents[0])
  }

  return (
    <AgentContext.Provider
      value={{
        currentAgent,
        setCurrentAgent,
        isLoading,
        agents,
        createAgent,
        updateAgent,
        removeAgent,
        refreshAgents,
      }}
    >
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider")
  }
  return context
}

export function getAgentMeta(id: string): AgentMeta | null {
  return defaultAgents.find((a) => a.id === id) || null
}
