import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Globe, Link2Icon, Rocket } from "lucide-react"

interface TemplateCardProps {
  icon: "rocket" | "globe" | "link"
  title: string
  description: string
}

export function TemplateCard({ icon, title, description }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-2">
          {icon === "rocket" && <Rocket className="h-5 w-5" />}
          {icon === "globe" && <Globe className="h-5 w-5" />}
          {icon === "link" && <Link2Icon className="h-5 w-5" />}
          <h3 className="font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-end">
        <Link href={`/dashboard/templates/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
