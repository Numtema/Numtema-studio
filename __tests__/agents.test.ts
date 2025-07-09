import { describe, it, expect, beforeEach, jest } from "@jest/globals"
import { agentExecutionFlow } from "../services/agents/flow"
import { PrepareAgent } from "../services/agents/nodes/PrepareAgent"
import { ExecuteAgent } from "../services/agents/nodes/ExecuteAgent"

describe("Agent Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("PrepareAgent Node", () => {
    it("should prepare agent configuration correctly", async () => {
      const prepareNode = new PrepareAgent()
      const mockShared = {
        agentConfig: {
          id: "agent_test",
          input: "Test input message",
          context: { userId: "user_1" },
        },
      }

      const prepResult = prepareNode.prep(mockShared)
      expect(prepResult).toEqual(mockShared.agentConfig)

      const execResult = await prepareNode.exec(mockShared.agentConfig)
      expect(execResult).toMatchObject({
        agentId: "agent_test",
        input: "Test input message",
        context: expect.objectContaining({
          userId: "user_1",
          timestamp: expect.any(String),
          sessionId: expect.stringContaining("session_"),
        }),
        startTime: expect.any(Number),
      })
    })

    it("should throw error for empty input", async () => {
      const prepareNode = new PrepareAgent()
      const mockConfig = {
        id: "agent_test",
        input: "",
        context: {},
      }

      await expect(prepareNode.exec(mockConfig)).rejects.toThrow("Input cannot be empty")
    })
  })

  describe("ExecuteAgent Node", () => {
    it("should execute agent successfully", async () => {
      const executeNode = new ExecuteAgent()
      const mockAgentData = {
        agentId: "agent_test",
        input: "Test input",
        context: {},
        startTime: Date.now(),
      }

      // Mock successful LLM call
      const execResult = await executeNode.exec(mockAgentData)

      expect(execResult).toMatchObject({
        output: expect.stringContaining("AI Response"),
        traceId: expect.stringContaining("trace"),
        model: "gpt-4o",
        tokensUsed: expect.any(Number),
        durationMs: expect.any(Number),
      })
    })

    it("should handle fallback on error", () => {
      const executeNode = new ExecuteAgent()
      const mockAgentData = {
        agentId: "agent_test",
        input: "Test input",
        context: {},
      }
      const mockError = new Error("LLM API failed")

      const fallbackResult = executeNode.execFallback(mockAgentData, mockError)

      expect(fallbackResult).toMatchObject({
        error: "LLM API failed",
        fallback: true,
        traceId: expect.stringContaining("trace_fallback"),
        model: "fallback",
        tokensUsed: 0,
        durationMs: 0,
      })
    })
  })

  describe("Agent Execution Flow", () => {
    it("should execute complete flow successfully", async () => {
      const mockShared = {
        agentConfig: {
          id: "agent_test",
          input: "Create a test response",
          context: { userId: "user_1" },
        },
      }

      // Mock successful execution
      jest.spyOn(Math, "random").mockReturnValue(0.5) // Avoid random failures

      await agentExecutionFlow.run(mockShared)

      expect(mockShared).toHaveProperty("agentData")
      expect(mockShared).toHaveProperty("result")
      expect(mockShared.result).toMatchObject({
        output: expect.any(String),
        traceId: expect.any(String),
        model: expect.any(String),
      })
    })
  })
})
