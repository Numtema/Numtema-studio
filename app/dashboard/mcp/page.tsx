"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MCPPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">MCP (Model Context Protocol)</h1>
        <p className="page-subtitle">Rejoignez la liste d'attente pour accéder aux fonctionnalités MCP</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Liste d'attente MCP</CardTitle>
          <CardDescription>Soyez parmi les premiers à tester les nouvelles fonctionnalités MCP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Entreprise (optionnel)</Label>
            <Input id="company" placeholder="Nom de votre entreprise" />
          </div>
          <Button className="w-full">Rejoindre la liste d'attente</Button>
        </CardContent>
      </Card>
    </div>
  )
}
