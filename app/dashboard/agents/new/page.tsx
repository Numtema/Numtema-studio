"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Brain, Database, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAgent } from "@/components/AgentProvider"
import Link from "next/link"

export default function NewAgentPage() {
  const { createAgent } = useAgent()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "gpt-4o",
    systemPrompt: "",
    temperature: 0.7,
    maxTokens: 1000,
    tools: {
      rag: false,
      analytics: false,
      webSearch: false,
    },
    memory: {
      shortTerm: true,
      longTerm: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Créer l'agent
      const newAgent = createAgent({
        name: formData.name,
        description: formData.description,
        model: formData.model,
        capabilities: [],
        tools: formData.tools,
      })

      toast({
        title: "Agent créé avec succès",
        description: `L'agent ${newAgent.name} (ID: ${newAgent.id}) a été créé.`,
      })

      // Rediriger vers la page des agents
      router.push("/dashboard/agents")
    } catch (error) {
      console.error("Error creating agent:", error)
      toast({
        title: "Erreur lors de la création de l'agent",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/agents">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-nasalization gradient-text">Créer un nouvel agent</h1>
          <p className="text-sm text-muted-foreground">Configurez votre agent IA avec des capacités personnalisées</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Informations de base
              </CardTitle>
              <CardDescription>Définissez l'identité et le rôle de votre agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'agent *</Label>
                <Input
                  id="name"
                  placeholder="Assistant Support Client"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez le rôle et les responsabilités de cet agent..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemPrompt">Prompt système</Label>
                <Textarea
                  id="systemPrompt"
                  placeholder="Vous êtes un assistant IA spécialisé dans..."
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration du modèle */}
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization">Configuration du modèle</CardTitle>
              <CardDescription>Paramètres du modèle de langage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">Modèle LLM</Label>
                <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                    <SelectItem value="claude-3.5-sonnet">Claude 3.5 Sonnet</SelectItem>
                    <SelectItem value="llama-3.1-70b">Llama 3.1 70B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Température: {formData.temperature}</Label>
                  <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="2"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: Number.parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Tokens max</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={formData.maxTokens}
                    onChange={(e) => setFormData({ ...formData, maxTokens: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outils et capacités */}
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Outils et capacités
              </CardTitle>
              <CardDescription>Activez les fonctionnalités avancées pour votre agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>RAG (Retrieval-Augmented Generation)</Label>
                  <p className="text-sm text-muted-foreground">Accès à une base de connaissances</p>
                </div>
                <Switch
                  checked={formData.tools.rag}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      tools: { ...formData.tools, rag: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">Analyse de données et métriques</p>
                </div>
                <Switch
                  checked={formData.tools.analytics}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      tools: { ...formData.tools, analytics: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recherche Web</Label>
                  <p className="text-sm text-muted-foreground">Accès aux informations en temps réel</p>
                </div>
                <Switch
                  checked={formData.tools.webSearch}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      tools: { ...formData.tools, webSearch: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Mémoire */}
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configuration mémoire
              </CardTitle>
              <CardDescription>Gestion de la mémoire de l'agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mémoire à court terme (STM)</Label>
                  <p className="text-sm text-muted-foreground">Contexte de la conversation actuelle</p>
                </div>
                <Switch
                  checked={formData.memory.shortTerm}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      memory: { ...formData.memory, shortTerm: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mémoire à long terme (LTM)</Label>
                  <p className="text-sm text-muted-foreground">Apprentissage persistant entre sessions</p>
                </div>
                <Switch
                  checked={formData.memory.longTerm}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      memory: { ...formData.memory, longTerm: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Aperçu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Modèle</Label>
                <p className="text-sm text-muted-foreground">{formData.model}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Outils activés</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.tools.rag && <span className="text-xs bg-muted px-2 py-1 rounded">RAG</span>}
                  {formData.tools.analytics && <span className="text-xs bg-muted px-2 py-1 rounded">Analytics</span>}
                  {formData.tools.webSearch && <span className="text-xs bg-muted px-2 py-1 rounded">Web Search</span>}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Coût estimé</Label>
                <p className="text-sm text-muted-foreground">~$0.02 par 1K tokens</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button type="submit" className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Créer l'agent
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Tester la configuration
              </Button>
              <Link href="/dashboard/agents">
                <Button variant="ghost" className="w-full">
                  Annuler
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() =>
                  setFormData({
                    ...formData,
                    name: "Support Client",
                    description: "Agent spécialisé dans le support client et la résolution de problèmes",
                    model: "gpt-4o-mini",
                    tools: { rag: true, analytics: false, webSearch: true },
                  })
                }
              >
                Support Client
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() =>
                  setFormData({
                    ...formData,
                    name: "Analyste de Données",
                    description: "Agent spécialisé dans l'analyse et la visualisation de données",
                    model: "gpt-4o",
                    tools: { rag: true, analytics: true, webSearch: false },
                  })
                }
              >
                Analyste de Données
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() =>
                  setFormData({
                    ...formData,
                    name: "Assistant Personnel",
                    description: "Agent polyvalent pour l'assistance personnelle et la productivité",
                    model: "claude-3.5-sonnet",
                    tools: { rag: false, analytics: false, webSearch: true },
                  })
                }
              >
                Assistant Personnel
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
