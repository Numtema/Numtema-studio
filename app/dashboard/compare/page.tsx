"use client"

import { useState } from "react"
import { AgentCompare } from "@/components/AgentCompare"
import { useAgent } from "@/components/AgentProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComparePage() {
  const { agents } = useAgent()
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["A", "B"])

  const handleAgentChange = (index: number, agentId: string) => {
    const newAgents = [...selectedAgents]
    newAgents[index] = agentId
    setSelectedAgents(newAgents)
  }

  const addComparison = () => {
    if (selectedAgents.length < 4) {
      const availableAgents = agents.filter((agent) => !selectedAgents.includes(agent.id))
      if (availableAgents.length > 0) {
        setSelectedAgents([...selectedAgents, availableAgents[0].id])
      }
    }
  }

  const removeComparison = (index: number) => {
    if (selectedAgents.length > 2) {
      const newAgents = selectedAgents.filter((_, i) => i !== index)
      setSelectedAgents(newAgents)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Comparaison d'Agents</h1>
          <p className="page-subtitle">Comparez les performances et capacités de vos agents IA</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addComparison} disabled={selectedAgents.length >= 4} variant="outline">
            Ajouter un agent
          </Button>
        </div>
      </div>

      {/* Sélecteurs d'agents */}
      <Card>
        <CardHeader>
          <CardTitle>Sélection des agents à comparer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            {selectedAgents.map((agentId, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select value={agentId} onValueChange={(value) => handleAgentChange(index, value)}>
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
                {selectedAgents.length > 2 && (
                  <Button variant="outline" size="sm" onClick={() => removeComparison(index)}>
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grille de comparaison */}
      <div
        className={`grid gap-6 ${
          selectedAgents.length === 2
            ? "grid-cols-1 lg:grid-cols-2"
            : selectedAgents.length === 3
              ? "grid-cols-1 lg:grid-cols-3"
              : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {selectedAgents.map((agentId) => (
          <AgentCompare key={agentId} agent={agentId} />
        ))}
      </div>
    </div>
  )
}
