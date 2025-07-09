"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("numtema_token") : null
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data for demo
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
    } catch (error) {
      setUser(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("numtema_token")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "admin@numtema.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "Admin User",
          email: email,
          avatar: "/placeholder.svg?height=32&width=32",
          role: "admin",
          createdAt: new Date().toISOString(),
        }

        setUser(mockUser)
        if (typeof window !== "undefined") {
          localStorage.setItem("numtema_token", "mock-token")
        }
        toast.success(`Bienvenue ${mockUser.name} !`)
        return true
      } else {
        toast.error("Email ou mot de passe incorrect")
        return false
      }
    } catch (error: any) {
      toast.error("Erreur de connexion")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=32&width=32",
        role: "user",
        createdAt: new Date().toISOString(),
      }

      setUser(mockUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("numtema_token", "mock-token")
      }
      toast.success(`Compte créé avec succès ! Bienvenue ${name} !`)
      return true
    } catch (error: any) {
      toast.error("Erreur lors de la création du compte")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("numtema_token")
      }
      setUser(null)
      toast.success("Déconnexion réussie")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
