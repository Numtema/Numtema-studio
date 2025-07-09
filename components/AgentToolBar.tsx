"use client"

import { useAgent } from "@/components/AgentProvider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { MicIcon as Microphone, Database, Zap } from "lucide-react"

export function AgentToolBar() {
  const { currentAgent, isLoading } = useAgent()

  if (isLoading || !currentAgent) {
    return <div className="h-10 w-full animate-pulse bg-muted/50 rounded-md"></div>
  }

  const tools = currentAgent.tools
  const memory = currentAgent.memory
  const llmModel = currentAgent.model

  return (
    <div className="flex items-center space-x-4 p-2 bg-muted/50 rounded-md">
      <span className="font-medium">Agent {currentAgent.id}</span>
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Microphone className={tools.chat ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat {tools.chat ? "enabled" : "disabled"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Database className={tools.rag ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>RAG {tools.rag ? "enabled" : "disabled"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Zap className={tools.analytics ? "text-green-500" : "text-gray-300"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Analytics {tools.analytics ? "enabled" : "disabled"}</p>
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
