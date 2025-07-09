"use client"

import { useState } from "react"
import Link from "next/link"
import { useAgent } from "@/components/AgentProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, MoreVertical, Edit, Trash, Play, Database, BarChart3, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AgentsPage() {
  const { agents, removeAgent, setCurrentAgent } = useAgent()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null)

  // Filtrer les agents en fonction de la recherche
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Gérer la suppression d'un agent
  const handleDeleteClick = (agentId: string) => {
    setAgentToDelete(agentId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (agentToDelete) {
      const success = removeAgent(agentToDelete)

      if (success) {
        toast({
          title: "Agent supprimé",
          description: "L'agent a été supprimé avec succès.",
        })
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer cet agent.",
          variant: "destructive",
        })
      }

      setDeleteDialogOpen(false)
      setAgentToDelete(null)
    }
  }

  // Sélectionner un agent comme agent actif
  const handleSelectAgent = (agentId: string) => {
    setCurrentAgent(agentId)
    toast({
      title: "Agent sélectionné",
      description: `L'agent est maintenant actif.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#333] dark:text-white">Agents</h1>
          <p className="text-muted-foreground">Gérez vos agents IA et leurs capacités</p>
        </div>
        <Link href="/dashboard/agents/new">
          <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel agent
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Rechercher un agent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#6C5CE7] text-white">{agent.id}</AvatarFallback>
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription className="text-xs">{agent.model}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSelectAgent(agent.id)}>
                        <Play className="mr-2 h-4 w-4" />
                        Sélectionner
                      </DropdownMenuItem>
                      <Link href={`/dashboard/agents/${agent.id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(agent.id)}
                        disabled={["A", "B", "C"].includes(agent.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                  {agent.description || "Aucune description"}
                </p>
                <div className="flex gap-1 mt-3">
                  {agent.tools?.rag && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      RAG
                    </Badge>
                  )}
                  {agent.tools?.analytics && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      Analytics
                    </Badge>
                  )}
                  {agent.tools?.webSearch && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Web
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleSelectAgent(agent.id)}>
                  <Play className="mr-2 h-3 w-3" />
                  Utiliser cet agent
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-40 bg-muted/20 rounded-lg">
            <div className="text-center">
              <p className="text-muted-foreground">Aucun agent trouvé</p>
              <Link href="/dashboard/agents/new">
                <Button variant="link" className="mt-2">
                  Créer un nouvel agent
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet agent ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
