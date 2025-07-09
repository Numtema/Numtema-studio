"use client"

import { useState, useEffect } from "react"
import { useAgent } from "@/components/AgentProvider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, ExternalLink } from "lucide-react"

// Données simulées pour les documents
const docsData = {
  A: [
    {
      id: "doc_001",
      title: "Guide Marketing Digital 2025",
      type: "pdf",
      size: "2.4 MB",
      date: "2025-03-15",
      tags: ["marketing", "digital", "stratégie"],
      preview: "Ce guide présente les dernières tendances en marketing digital pour 2025...",
    },
    {
      id: "doc_002",
      title: "Analyse Concurrentielle - Secteur E-commerce",
      type: "docx",
      size: "1.8 MB",
      date: "2025-04-02",
      tags: ["analyse", "concurrence", "e-commerce"],
      preview: "Analyse détaillée des principaux concurrents dans le secteur e-commerce...",
    },
    {
      id: "doc_003",
      title: "Rapport Engagement Réseaux Sociaux Q1 2025",
      type: "xlsx",
      size: "3.2 MB",
      date: "2025-04-10",
      tags: ["réseaux sociaux", "engagement", "rapport"],
      preview: "Rapport trimestriel sur les performances des campagnes sur les réseaux sociaux...",
    },
  ],
  B: [
    {
      id: "doc_004",
      title: "Analyse Financière Q1 2025",
      type: "pdf",
      size: "4.1 MB",
      date: "2025-03-20",
      tags: ["finance", "analyse", "rapport"],
      preview: "Analyse détaillée des résultats financiers du premier trimestre 2025...",
    },
    {
      id: "doc_005",
      title: "Prévisions Ventes 2025-2026",
      type: "xlsx",
      size: "2.7 MB",
      date: "2025-04-05",
      tags: ["ventes", "prévisions", "business"],
      preview: "Modèle de prévision des ventes pour les 12 prochains mois...",
    },
    {
      id: "doc_006",
      title: "KPIs Business Intelligence",
      type: "pptx",
      size: "5.3 MB",
      date: "2025-04-12",
      tags: ["KPI", "business intelligence", "dashboard"],
      preview: "Présentation des principaux indicateurs de performance pour le suivi d'activité...",
    },
  ],
}

export function DocsViewer() {
  const { currentAgent } = useAgent()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDocs, setFilteredDocs] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Charger les documents
  useEffect(() => {
    if (!currentAgent) return

    setIsLoading(true)

    // Simuler un appel API
    setTimeout(() => {
      const docs = docsData[currentAgent.id as keyof typeof docsData] || []
      setFilteredDocs(docs)
      setIsLoading(false)
    }, 1000)
  }, [currentAgent])

  // Filtrer les documents
  useEffect(() => {
    if (!currentAgent) return

    const docs = docsData[currentAgent.id as keyof typeof docsData] || []

    const filtered = docs.filter((doc) => {
      // Filtrer par recherche
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Filtrer par tags
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => doc.tags.includes(tag))

      return matchesSearch && matchesTags
    })

    setFilteredDocs(filtered)
  }, [searchQuery, selectedTags, currentAgent])

  // Extraire tous les tags uniques
  const allTags = currentAgent
    ? [...new Set((docsData[currentAgent.id as keyof typeof docsData] || []).flatMap((doc) => doc.tags))]
    : []

  // Gérer la sélection des tags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  if (isLoading || !currentAgent) {
    return <div className="h-64 w-full animate-pulse bg-muted rounded-md"></div>
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filtres</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="pdf">PDF</TabsTrigger>
          <TabsTrigger value="docx">Word</TabsTrigger>
          <TabsTrigger value="xlsx">Excel</TabsTrigger>
          <TabsTrigger value="pptx">PowerPoint</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Aucun document trouvé</h3>
              <p className="text-sm text-muted-foreground">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{doc.type.toUpperCase()}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{new Date(doc.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{doc.preview}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Télécharger</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Ouvrir</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {["pdf", "docx", "xlsx", "pptx"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {filteredDocs.filter((doc) => doc.type === type).length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Aucun document {type.toUpperCase()} trouvé</h3>
                <p className="text-sm text-muted-foreground">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              filteredDocs
                .filter((doc) => doc.type === type)
                .map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{doc.type.toUpperCase()}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{new Date(doc.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{doc.preview}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Télécharger</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Ouvrir</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
