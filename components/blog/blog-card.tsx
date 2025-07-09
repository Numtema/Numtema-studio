import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  image: string
  category: string
  featured?: boolean
}

export function BlogCard({ title, excerpt, author, date, readTime, image, category, featured = false }: BlogCardProps) {
  const cardClasses = featured
    ? "group cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 md:grid md:grid-cols-2 md:gap-6"
    : "group cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 scale-on-hover"

  return (
    <Link href={`/blog/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <article className={cardClasses}>
        <div className={featured ? "relative overflow-hidden" : "relative overflow-hidden aspect-video"}>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {category}
            </Badge>
          </div>
        </div>

        <div className={featured ? "p-6 md:p-8" : "p-6"}>
          <div className="space-y-3">
            <h3
              className={`font-nasalization leading-tight group-hover:text-[#6c5ce7] transition-colors ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
            >
              {title}
            </h3>

            <p className={`text-muted-foreground ${featured ? "text-lg" : "text-sm"}`}>{excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
