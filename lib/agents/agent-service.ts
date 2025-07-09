"use client"

import type { AgentMeta } from "@/components/AgentProvider"

// Stockage local des agents
const AGENTS_STORAGE_KEY = "numtema_agents"

// Agents par défaut
const defaultAgents: Record<string, AgentMeta> = {
  A: {
    id: "A",
    name: "Agent Analyste",
    description: "Spécialisé dans l'analyse de données et les insights business",
    model: "gpt-4o",
    capabilities: ["Analyse de données", "Visualisation", "Reporting"],
    tools: {
      rag: true,
      analytics: true,
      webSearch: false,
    },
    avatar: "/agents/agent-a.png",
  },
  B: {
    id: "B",
    name: "Agent Assistant",
    description: "Assistant polyvalent pour les tâches quotidiennes",
    model: "gpt-4o-mini",
    capabilities: ["Support client", "Gestion de tâches", "Communication"],
    tools: {
      rag: false,
      analytics: false,
      webSearch: true,
    },
    avatar: "/agents/agent-b.png",
  },
  C: {
    id: "C",
    name: "Agent Créatif",
    description: "Spécialisé dans la création de contenu et le design",
    model: "claude-3.5-sonnet",
    capabilities: ["Création de contenu", "Design", "Marketing"],
    tools: {
      rag: true,
      analytics: false,
      webSearch: true,
    },
    avatar: "/agents/agent-c.png",
  },
}

// Initialiser le stockage avec les agents par défaut si nécessaire
export function initializeAgentStorage() {
  if (typeof window === "undefined") return defaultAgents

  const storedAgents = localStorage.getItem(AGENTS_STORAGE_KEY)
  if (!storedAgents) {
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(defaultAgents))
    return defaultAgents
  }

  try {
    return JSON.parse(storedAgents)
  } catch (error) {
    console.error("Error parsing stored agents:", error)
    return defaultAgents
  }
}

// Récupérer tous les agents
export function getAllAgents(): AgentMeta[] {
  const agents = initializeAgentStorage()
  return Object.values(agents)
}

// Récupérer un agent par son ID
export function getAgent(id: string): AgentMeta | null {
  const agents = initializeAgentStorage()
  return agents[id] || null
}

// Créer ou mettre à jour un agent
export function saveAgent(agent: AgentMeta): AgentMeta {
  if (typeof window === "undefined") return agent

  const agents = initializeAgentStorage()

  // Générer un ID si nécessaire
  if (!agent.id) {
    // Trouver le prochain ID disponible (A, B, C, ... Z, AA, AB, etc.)
    const ids = Object.keys(agents).sort()
    let nextId = "A"

    if (ids.length > 0) {
      const lastId = ids[ids.length - 1]
      // Logique simple pour incrémenter l'ID
      if (lastId.length === 1 && lastId === "Z") {
        nextId = "AA"
      } else if (lastId.length === 1) {
        nextId = String.fromCharCode(lastId.charCodeAt(0) + 1)
      } else {
        // Pour les IDs à plusieurs caractères, incrémenter le dernier caractère
        const lastChar = lastId.charAt(lastId.length - 1)
        if (lastChar === "Z") {
          nextId = lastId.substring(0, lastId.length - 1) + "A" + "A"
        } else {
          nextId = lastId.substring(0, lastId.length - 1) + String.fromCharCode(lastChar.charCodeAt(0) + 1)
        }
      }
    }

    agent.id = nextId
  }

  agents[agent.id] = agent
  localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents))

  return agent
}

// Supprimer un agent
export function deleteAgent(id: string): boolean {
  if (typeof window === "undefined") return false

  const agents = initializeAgentStorage()

  // Ne pas supprimer les agents par défaut A, B, C
  if (["A", "B", "C"].includes(id)) {
    console.warn("Cannot delete default agents (A, B, C)")
    return false
  }

  if (agents[id]) {
    delete agents[id]
    localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents))
    return true
  }

  return false
}
