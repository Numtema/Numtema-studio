// services/auth/api.ts
import { api, APIError } from "encore.dev/api"
import { authHandler, Gateway } from "encore.dev/auth"
import type { Header } from "encore.dev/api"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { queryRow, exec } from "../../shared/database"
import type { User, LoginParams, RegisterParams, AuthResponse, AuthData } from "./types"

// Configuration du gestionnaire d'auth
interface AuthHandlerParams {
  authorization: Header<"Authorization">
}

export const auth = authHandler<AuthHandlerParams, AuthData>(async (params) => {
  const token = params.authorization?.replace("Bearer ", "")

  if (!token) {
    throw APIError.unauthenticated("Missing authorization token")
  }

  // Vérifier le token (API key)
  const user = await queryRow<User>(`SELECT id, email, plan FROM users WHERE api_key = $1`, [token])

  if (!user) {
    throw APIError.unauthenticated("Invalid token")
  }

  return {
    userId: user.id,
    email: user.email,
    plan: user.plan,
  }
})

// Gateway avec auth handler
export const gateway = new Gateway({
  authHandler: auth,
})

// Endpoint de connexion
export const login = api<LoginParams, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (params): Promise<AuthResponse> => {
    const user = await queryRow<any>(
      `SELECT id, email, name, password_hash, plan, api_key, settings, created_at, updated_at FROM users WHERE email = $1`,
      [params.email],
    )

    if (!user || !user.password_hash) {
      throw APIError.unauthenticated("Invalid credentials")
    }

    const isValid = await bcrypt.compare(params.password, user.password_hash)
    if (!isValid) {
      throw APIError.unauthenticated("Invalid credentials")
    }

    // Générer API key si pas existante
    let apiKey = user.api_key
    if (!apiKey) {
      apiKey = `nmt_${crypto.randomBytes(32).toString("hex")}`
      await exec(`UPDATE users SET api_key = $1, updated_at = NOW() WHERE id = $2`, [apiKey, user.id])
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        apiKey,
        settings: user.settings,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      token: apiKey,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
    }
  },
)

// Endpoint d'inscription
export const register = api<RegisterParams, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (params): Promise<AuthResponse> => {
    const existingUser = await queryRow<{ id: string }>(`SELECT id FROM users WHERE email = $1`, [params.email])

    if (existingUser) {
      throw APIError.invalidArgument("User already exists")
    }

    const passwordHash = await bcrypt.hash(params.password, 12)
    const apiKey = `nmt_${crypto.randomBytes(32).toString("hex")}`
    const userId = crypto.randomUUID()

    await exec(
      `INSERT INTO users (id, email, name, password_hash, api_key, plan) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, params.email, params.name, passwordHash, apiKey, "free"],
    )

    const user = await queryRow<any>(
      `SELECT id, email, name, plan, api_key, settings, created_at, updated_at FROM users WHERE id = $1`,
      [userId],
    )

    if (!user) {
      throw APIError.internal("Failed to create user")
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        apiKey: user.api_key,
        settings: user.settings,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      token: user.api_key,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    }
  },
)

// Endpoint pour récupérer le profil utilisateur
export const getProfile = api<{}, { user: Omit<User, "apiKey"> }>(
  { expose: true, method: "GET", path: "/auth/profile", auth: true },
  async (): Promise<{ user: Omit<User, "apiKey"> }> => {
    const { userId } = (await import("~encore/auth")).getAuthData()!

    const user = await queryRow<any>(
      `SELECT id, email, name, plan, settings, created_at, updated_at FROM users WHERE id = $1`,
      [userId],
    )

    if (!user) {
      throw APIError.notFound("User not found")
    }

    return { user }
  },
)

// Endpoint de déconnexion (ne révoque pas l'API key pour l'instant, pourrait être une feature future)
export const logout = api<{}, { success: boolean }>(
  { expose: true, method: "POST", path: "/auth/logout", auth: true },
  async (): Promise<{ success: boolean }> => {
    // En pratique, la déconnexion côté client suffit si on utilise des tokens stateless.
    // Pour une sécurité accrue, on pourrait maintenir une liste de tokens révoqués.
    return { success: true }
  },
)
