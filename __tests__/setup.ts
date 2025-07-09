// Configuration globale pour les tests
import { jest } from "@jest/globals"

// Mock console pour éviter le spam dans les tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
}

// Mock des fonctions utilitaires
jest.mock("../shared/utils", () => ({
  generateId: jest.fn(() => "mock-id-123"),
  getCurrentTimestamp: jest.fn(() => "2024-01-01T00:00:00.000Z"),
  sleep: jest.fn(() => Promise.resolve()),
  formatDuration: jest.fn((ms: number) => `${ms}ms`),
}))
