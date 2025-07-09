import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFooter } from "@/components/landing-footer"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Multi-Agent AI Systems",
    excerpt: "Exploring how multiple AI agents can collaborate to solve complex problems and the challenges ahead.",
    author: "Lionel Numtema",
    date: "May 20, 2025",
    readTime: "8 min read",
    image: "/ai-agents-collaboration.png",
    category: "AI Research",
    featured: true,
  }

  const posts = [
    {
      title: "Building Reliable AI Agents with Observability",
      excerpt: "Learn how to implement comprehensive monitoring and debugging for your AI agents in production.",
      author: "Sarah Chen",
      date: "May 18, 2025",
      readTime: "6 min read",
      image: "/placeholder.svg?height=300&width=600&query=AI+monitoring+dashboard",
      category: "Engineering",
    },
    {
      title: "CrewAI vs AutoGen: A Comprehensive Comparison",
      excerpt: "Deep dive into the differences between popular multi-agent frameworks and when to use each.",
      author: "Marcus Rodriguez",
      date: "May 15, 2025",
      readTime: "10 min read",
      image: "/placeholder.svg?height=300&width=600&query=AI+frameworks+comparison",
      category: "Frameworks",
    },
    {
      title: "Optimizing LLM Costs in Production",
      excerpt: "Strategies to reduce your AI infrastructure costs while maintaining performance and reliability.",
      author: "Emma Thompson",
      date: "May 12, 2025",
      readTime: "7 min read",
      image: "/placeholder.svg?height=300&width=600&query=cost+optimization+AI",
      category: "Cost Management",
    },
    {
      title: "RAG Systems: Best Practices for Knowledge Integration",
      excerpt: "How to build effective Retrieval-Augmented Generation systems for your AI agents.",
      author: "David Kim",
      date: "May 10, 2025",
      readTime: "9 min read",
      image: "/placeholder.svg?height=300&width=600&query=RAG+knowledge+base",
      category: "RAG",
    },
    {
      title: "Security Considerations for AI Agent Deployment",
      excerpt: "Essential security practices when deploying AI agents in enterprise environments.",
      author: "Lisa Wang",
      date: "May 8, 2025",
      readTime: "5 min read",
      image: "/placeholder.svg?height=300&width=600&query=AI+security+enterprise",
      category: "Security",
    },
    {
      title: "The Evolution of Agent Orchestration",
      excerpt: "From simple chatbots to complex multi-agent systems: a journey through AI evolution.",
      author: "Alex Johnson",
      date: "May 5, 2025",
      readTime: "12 min read",
      image: "/placeholder.svg?height=300&width=600&query=AI+evolution+timeline",
      category: "History",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-[#e779c1]/10 to-[#6c5ce7]/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center hero-animation">
              <h1 className="font-nasalization text-4xl gradient-text md:text-5xl/tight">Nümtema Studio Blog</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Insights, tutorials, and updates from the world of AI agents and multi-agent systems.
              </p>
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search articles..." className="pl-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="font-nasalization text-2xl gradient-text mb-4">Featured Article</h2>
            </div>
            <BlogCard {...featuredPost} />
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-8 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {["All", "AI Research", "Engineering", "Frameworks", "Cost Management", "RAG", "Security", "History"].map(
                (category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className={category === "All" ? "bg-[#6c5ce7] hover:bg-[#6c5ce7]/90" : ""}
                  >
                    {category}
                  </Button>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="font-nasalization text-2xl gradient-text mb-4">Latest Articles</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div key={index} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <h2 className="font-nasalization text-2xl gradient-text">Stay Updated</h2>
              <p className="text-muted-foreground">
                Get the latest insights on AI agents, tutorials, and product updates delivered to your inbox.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Input placeholder="Enter your email" type="email" />
                <Button className="bg-[#6c5ce7] hover:bg-[#6c5ce7]/90 text-white">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">No spam. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
