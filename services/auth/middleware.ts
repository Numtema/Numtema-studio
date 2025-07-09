import { authHandler, Gateway } from "encore.dev/api"
import type { Header } from "encore.dev/api"

interface AuthParams {
  authorization: Header<"Authorization">
}

interface AuthData {
  userId: string
  email: string
  plan: string
}

// Mock user database
const mockUsers = [
  { id: "user_1", email: "admin@numtema.com", plan: "enterprise" },
  { id: "user_2", email: "user@example.com", plan: "pro" },
]

export const auth = authHandler<AuthParams, AuthData>(async (params) => {
  const token = params.authorization?.replace("Bearer ", "")

  if (!token) {
    throw new Error("No authorization token provided")
  }

  // En production: vérifier JWT, consulter base de données
  if (token === "mock-admin-token") {
    return {
      userId: "user_1",
      email: "admin@numtema.com",
      plan: "enterprise",
    }
  }

  if (token === "mock-user-token") {
    return {
      userId: "user_2",
      email: "user@example.com",
      plan: "pro",
    }
  }

  throw new Error("Invalid token")
})

export const gateway = new Gateway({
  authHandler: auth,
})
