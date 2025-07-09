import { Node } from "pocketflow"
import { llmClient, type LLMConfig } from "../../../shared/llm-client"
import type { AgentData } from "./PrepareAgent"

export interface ExecutionResult {
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  duration: number
  timestamp: string
}

export class ExecuteAgent extends Node {
  name = "ExecuteAgent"
  maxRetries = 3
  waitBetweenRetries = 2000

  prep(shared: Record<string, any>): { agent: AgentData; input: string; context?: Record<string, any> } {
    return {
      agent: shared.agentData,
      input: shared.originalInput,
      context: shared.userContext,
    }
  }

  async exec(params: { agent: AgentData; input: string; context?: Record<string, any> }): Promise<ExecutionResult> {
    const startTime = Date.now()

    const llmConfig: LLMConfig = {
      model: params.agent.model,
      temperature: params.agent.temperature,
      maxTokens: params.agent.maxTokens,
      systemPrompt: params.agent.systemPrompt,
    }

    let finalInput = params.input
    if (params.agent.systemPrompt) {
      finalInput = `${params.agent.systemPrompt}\n\nUser: ${params.input}`
    }

    const response = await llmClient.callLLM(llmConfig, finalInput, params.context)
    const duration = Date.now() - startTime

    return {
      content: response.content,
      usage: response.usage,
      model: response.model,
      duration,
      timestamp: new Date().toISOString(),
    }
  }

  async execFallback(
    params: { agent: AgentData; input: string; context?: Record<string, any> },
    error: Error,
  ): Promise<ExecutionResult> {
    console.error(`Agent execution failed for ${params.agent.name}:`, error)

    const fallbackModel = params.agent.projectSettings?.fallbackModel || "gpt-4o-mini"

    try {
      const fallbackConfig: LLMConfig = {
        model: fallbackModel,
        temperature: 0.3,
        maxTokens: 500,
        systemPrompt: "You are a helpful assistant. The primary model failed, so please provide a basic response.",
      }

      const response = await llmClient.callLLM(fallbackConfig, params.input, params.context)

      return {
        content: `[Fallback Response] ${response.content}`,
        usage: response.usage,
        model: fallbackModel,
        duration: 1000,
        timestamp: new Date().toISOString(),
      }
    } catch (fallbackError) {
      return {
        content: `Je suis désolé, mais je ne peux pas traiter votre demande en ce moment. Erreur: ${error.message}`,
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        model: "fallback",
        duration: 100,
        timestamp: new Date().toISOString(),
      }
    }
  }

  post(shared: Record<string, any>, prepRes: any, execRes: ExecutionResult): string {
    shared.executionResult = execRes
    if (execRes.model === "fallback") {
      return "error"
    }
    return "default"
  }
}
