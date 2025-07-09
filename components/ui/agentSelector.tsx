"use client"

import { useAgent } from "@/components/AgentProvider"
import { getAllAgents } from "@/lib/agents/registry"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"

interface AgentSelectorProps {
  variant?: "tabs" | "dropdown"
}

export function AgentSelector({ variant = "tabs" }: AgentSelectorProps) {
  const { currentAgent, setCurrentAgent } = useAgent()
  const agents = getAllAgents()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Utiliser le dropdown sur mobile, quelle que soit la variante demandée
  const effectiveVariant = isMobile ? "dropdown" : variant

  if (!currentAgent) {
    return <div className="h-10 w-40 animate-pulse bg-muted rounded-md"></div>
  }

  if (effectiveVariant === "dropdown") {
    return (
      <Select value={currentAgent.id} onValueChange={setCurrentAgent}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner un agent" />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              Agent {agent.id} - {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <Tabs value={currentAgent.id} onValueChange={setCurrentAgent} className="w-full">
      <TabsList className="grid grid-cols-2">
        {agents.map((agent) => (
          <TabsTrigger key={agent.id} value={agent.id} className="font-nasalization">
            Agent {agent.id}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
