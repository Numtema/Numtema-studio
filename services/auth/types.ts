// services/auth/types.ts
export interface User {
  id: string
  email: string
  name: string
  plan: string
  apiKey?: string
  settings: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
  expiresAt: string
}

export interface AuthData {
  userId: string
  email: string
  plan: string
}
