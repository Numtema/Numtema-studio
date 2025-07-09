"use client"

import { MicIcon as Microphone, Database, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface AgentToolBarProps {
  agent: string
}

export function AgentToolBar({ agent }: AgentToolBarProps) {
  // Simulated data - in a real app, this would come from your agent state
  const tools = agent === "A" ? ["chat", "rag", "analytics"] : ["chat", "analytics"]

  const memory = agent === "A" ? { stm: 12, ltm: 5 } : { stm: 8, ltm: 3 }

  const llmModel = agent === "A" ? "gemini-2.0-flash" : "gpt-4o"

  return (
    <div className="flex items-center space-x-4 p-2 bg-muted/50 rounded-md">
      <span className="font-medium">Agent {agent}</span>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Microphone className={tools.includes("chat") ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat {tools.includes("chat") ? "enabled" : "disabled"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Database className={tools.includes("rag") ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>RAG {tools.includes("rag") ? "enabled" : "disabled"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Zap className={tools.includes("analytics") ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Analytics {tools.includes("analytics") ? "enabled" : "disabled"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex space-x-1">
        <Badge variant="outline">STM: {memory.stm}</Badge>
        <Badge variant="outline">LTM: {memory.ltm}</Badge>
      </div>
      <Badge variant="secondary">LLM: {llmModel}</Badge>
    </div>
  )
}
