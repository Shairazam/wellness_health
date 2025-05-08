"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avator"
import { Card } from "../components/ui/card"
import { sendMessage, getConversationHistory } from "@/lib/chat"
import { checkAuth } from "@/lib/auth"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await checkAuth()
      if (!authenticated) {
        router.push("/login")
        return
      }
      setIsAuthenticated(true)
      loadConversationHistory()
    }

    checkAuthentication()
  }, [router])

  const loadConversationHistory = async () => {
    try {
      const history = await getConversationHistory()
      if (history && history.length > 0) {
        setMessages(history)
      } else {
        // Add a welcome message if there's no history
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm your mental wellness coach. How are you feeling today?",
            timestamp: Date.now(),
          },
        ])
      }
    } catch (error) {
      console.error("Failed to load conversation history:", error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await sendMessage(input)

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
      // Add an error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
          timestamp: Date.now(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (isLoadingHistory) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading your conversation history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Mental Wellness Coach</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={() => router.push("/account")} className="text-sm">
              My Account
            </Button>
            <Button
              className="ghost"
              onClick={() => {
                // Handle logout
                router.push("/")
              }}
              
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-10 w-10 bg-amber-50">
                    {message.role === "user" ? (
                      <AvatarFallback>U</AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src={""} alt={""} />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <Card className={`p-3 ${message.role === "assistant" ? "bg-primary text-primary-foreground" : ""}`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        message.role === "assistant" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex flex-col gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[80px] resize-none"
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
