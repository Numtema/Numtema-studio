"use client"

import dynamic from "next/dynamic"

const AgentProvider = dynamic(() => import("@/components/AgentProvider"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
    </div>
  ),
})

const ChatWindow = dynamic(() => import("@/components/ChatWindow"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Chargement du chat...</div>
    </div>
  ),
})

const PostComposer = dynamic(() => import("@/components/PostComposer"), {
  ssr: false,
  loading: () => (
    <div className="border-t p-4">
      <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
    </div>
  ),
})

export default function ChatClient() {
  return (
    <AgentProvider>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto">
          <ChatWindow className="max-w-4xl mx-auto" />
        </div>
        <div className="border-t p-4">
          <PostComposer className="max-w-4xl mx-auto" />
        </div>
      </div>
    </AgentProvider>
  )
}
