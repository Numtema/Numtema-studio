"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface PostComposerProps {
  className?: string
  onSend?: (message: string) => void
}

export function PostComposer({ className, onSend }: PostComposerProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    try {
      onSend?.(message)
      setMessage("")
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tapez votre message..."
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={!message.trim() || isLoading} className="bg-primary hover:bg-primary/90">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
