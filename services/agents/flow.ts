import { Flow } from "pocketflow"
import { PrepareAgent } from "./nodes/PrepareAgent"
import { ExecuteAgent } from "./nodes/ExecuteAgent"
import { LogTrace } from "./nodes/LogTrace"
import { NotifyError } from "./nodes/NotifyError"
import crypto from "crypto"

const prepareAgent = new PrepareAgent()
const executeAgent = new ExecuteAgent()
const logTrace = new LogTrace()
const notifyError = new NotifyError()

prepareAgent.to(executeAgent)
executeAgent.on("default").to(logTrace)
executeAgent.on("error").to(notifyError)

export const agentExecutionFlow = new Flow({
  start: prepareAgent,
  name: "AgentExecutionFlow",
})

export async function executeAgentFlow(agentId: string, input: string, context?: Record<string, any>) {
  const shared = {
    agentId,
    input,
    context,
    executionId: crypto.randomUUID(),
    traceId: crypto.randomUUID(),
  }

  try {
    await agentExecutionFlow.run(shared)
    return {
      success: true,
      executionId: shared.executionId,
      result: shared.executionResult,
      traceId: shared.traceId,
    }
  } catch (error: any) {
    shared.error = error.message
    await notifyError.exec({
      agent: shared.agentData,
      error: error.message,
      executionId: shared.executionId,
    })
    return {
      success: false,
      executionId: shared.executionId,
      error: error.message,
      traceId: shared.traceId,
    }
  }
}
