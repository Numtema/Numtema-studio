"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Eye, EyeOff, Plus, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ApiKeysPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [newKey, setNewKey] = useState({
    name: "",
    permissions: "read",
    expiresIn: "never",
  })

  const apiKeys = [
    {
      id: "key_1",
      name: "Production API Key",
      key: "nt_sk_1234567890abcdef1234567890abcdef",
      permissions: "full",
      created: "2025-05-20",
      lastUsed: "2025-05-23",
      status: "active",
    },
    {
      id: "key_2",
      name: "Development Key",
      key: "nt_sk_abcdef1234567890abcdef1234567890",
      permissions: "read",
      created: "2025-05-15",
      lastUsed: "2025-05-22",
      status: "active",
    },
    {
      id: "key_3",
      name: "Testing Key",
      key: "nt_sk_9876543210fedcba9876543210fedcba",
      permissions: "write",
      created: "2025-05-10",
      lastUsed: "Never",
      status: "inactive",
    },
  ]

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleCreateKey = () => {
    console.log("Creating new API key:", newKey)
    setShowCreateForm(false)
    setNewKey({ name: "", permissions: "read", expiresIn: "never" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-nasalization gradient-text">Clés API</h1>
          <p className="text-sm text-muted-foreground">Gérez vos clés API pour accéder à Nümtema Studio</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle clé API
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-nasalization">Créer une nouvelle clé API</CardTitle>
            <CardDescription>Configurez les permissions et la durée de vie de votre nouvelle clé</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="keyName">Nom de la clé</Label>
                <Input
                  id="keyName"
                  placeholder="Production API Key"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select
                  value={newKey.permissions}
                  onValueChange={(value) => setNewKey({ ...newKey, permissions: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Lecture seule</SelectItem>
                    <SelectItem value="write">Lecture et écriture</SelectItem>
                    <SelectItem value="full">Accès complet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires">Expiration</Label>
                <Select value={newKey.expiresIn} onValueChange={(value) => setNewKey({ ...newKey, expiresIn: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">30 jours</SelectItem>
                    <SelectItem value="90d">90 jours</SelectItem>
                    <SelectItem value="1y">1 an</SelectItem>
                    <SelectItem value="never">Jamais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateKey} className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
                Créer la clé
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-nasalization">Clés API existantes</CardTitle>
          <CardDescription>Gérez et surveillez vos clés API actives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{apiKey.name}</h3>
                    <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                    <Badge variant="outline">
                      {apiKey.permissions === "full"
                        ? "Accès complet"
                        : apiKey.permissions === "write"
                          ? "Lecture/Écriture"
                          : "Lecture seule"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Créée le {apiKey.created}</span>
                    <span>Dernière utilisation: {apiKey.lastUsed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {visibleKeys.has(apiKey.id)
                        ? apiKey.key
                        : `${apiKey.key.substring(0, 12)}...${apiKey.key.substring(apiKey.key.length - 4)}`}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="h-6 w-6"
                    >
                      {visibleKeys.has(apiKey.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)} className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                    <DropdownMenuItem>Régénérer</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-nasalization">Documentation</CardTitle>
          <CardDescription>Comment utiliser vos clés API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Installation</h4>
            <code className="block bg-muted p-3 rounded text-sm">pip install numtema</code>
          </div>
          <div>
            <h4 className="font-medium mb-2">Utilisation</h4>
            <code className="block bg-muted p-3 rounded text-sm whitespace-pre">
              {`import numtema as nt

# Initialiser le client
client = nt.Client(api_key="votre_cle_api")

# Créer un projet
project = client.create_project(name="Mon Projet")`}
            </code>
          </div>
          <div>
            <h4 className="font-medium mb-2">Variables d'environnement</h4>
            <code className="block bg-muted p-3 rounded text-sm">export NUMTEMA_API_KEY="votre_cle_api"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
