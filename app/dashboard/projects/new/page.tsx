"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    organization: "personal",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de création du projet
    console.log("Creating project:", formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-nasalization gradient-text">Créer un nouveau projet</h1>
          <p className="text-sm text-muted-foreground">Configurez votre nouveau projet d'agents IA</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization">Informations du projet</CardTitle>
              <CardDescription>Définissez les paramètres de base de votre projet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du projet *</Label>
                  <Input
                    id="name"
                    placeholder="Mon projet d'agents IA"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez l'objectif de votre projet..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organisation</Label>
                  <Select
                    value={formData.organization}
                    onValueChange={(value) => setFormData({ ...formData, organization: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une organisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personnel</SelectItem>
                      <SelectItem value="team">Équipe</SelectItem>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Template (optionnel)</Label>
                  <Select
                    value={formData.template}
                    onValueChange={(value) => setFormData({ ...formData, template: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Projet vide</SelectItem>
                      <SelectItem value="customer-support">Support client</SelectItem>
                      <SelectItem value="data-analysis">Analyse de données</SelectItem>
                      <SelectItem value="content-creation">Création de contenu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer le projet
                  </Button>
                  <Link href="/dashboard/projects">
                    <Button variant="outline">Annuler</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Templates disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h4 className="font-medium">Support Client</h4>
                <p className="text-sm text-muted-foreground">Agent pour répondre aux questions clients</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h4 className="font-medium">Analyse de Données</h4>
                <p className="text-sm text-muted-foreground">Agent pour analyser et interpréter les données</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h4 className="font-medium">Création de Contenu</h4>
                <p className="text-sm text-muted-foreground">Agent pour générer du contenu marketing</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-nasalization text-lg">Aide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Besoin d'aide pour créer votre projet ?</p>
              <Button variant="outline" size="sm" className="w-full">
                Voir la documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
