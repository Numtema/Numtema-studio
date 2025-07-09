import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, PlayIcon } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  organization: string
  traces: number
  lastActive: string
}

export function ProjectCard({ title, description, organization, traces, lastActive }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="grid gap-0.5">
          <Link href="/dashboard/project" className="font-nasalization hover:underline">
            {title}
          </Link>
          <p className="text-xs text-muted-foreground">Organization: {organization}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm">{traces} Traces</p>
          <p className="text-xs text-muted-foreground">Last active: {lastActive}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-3">
        <Button variant="default" size="sm" className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white">
          <PlayIcon className="mr-2 h-4 w-4" />
          Open Project
        </Button>
      </CardFooter>
    </Card>
  )
}
