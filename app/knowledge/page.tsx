import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Filter } from "lucide-react"

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-nasalization gradient-text">Base de connaissances</h1>

      <Card className="bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              Documents
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher dans les documents..." className="pl-8" />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-muted/50">
              finance
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              analyse
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              rapport
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              ventes
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              prévisions
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              business
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              KPI
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              business intelligence
            </Badge>
            <Badge variant="outline" className="bg-muted/50">
              dashboard
            </Badge>
          </div>

          <Tabs defaultValue="tous">
            <TabsList className="mb-4">
              <TabsTrigger value="tous">Tous</TabsTrigger>
              <TabsTrigger value="pdf">PDF</TabsTrigger>
              <TabsTrigger value="word">Word</TabsTrigger>
              <TabsTrigger value="excel">Excel</TabsTrigger>
              <TabsTrigger value="powerpoint">PowerPoint</TabsTrigger>
            </TabsList>

            <TabsContent value="tous" className="space-y-4">
              {/* Liste des documents */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="p-4 hover:bg-muted/50 transition cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Rapport d'analyse financière Q{i} 2023</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ce document contient l'analyse détaillée des performances financières pour le trimestre {i} de
                        l'année 2023.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          finance
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          analyse
                        </Badge>
                        <span className="text-xs text-muted-foreground">Modifié le 15/0{i}/2023</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pdf" className="space-y-4">
              <Card className="p-4 hover:bg-muted/50 transition cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Rapport d'analyse financière Q1 2023</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ce document contient l'analyse détaillée des performances financières pour le trimestre 1 de
                      l'année 2023.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        finance
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        pdf
                      </Badge>
                      <span className="text-xs text-muted-foreground">Modifié le 15/01/2023</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Autres onglets similaires */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
