'use client'

import { mockResources } from '@/lib/mockData'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickSuggestions = [
  { text: 'Food assistance', category: 'Emergency Aid' },
  { text: 'Housing help', category: 'Emergency Aid' },
  { text: 'Mental health support', category: 'Health Support' },
  { text: 'Childcare services', category: 'Family Services' },
  { text: 'Education programs', category: 'Education' },
]

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your AI Community Concierge. I'm here to help you find the resources you need. What can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Simple keyword matching - in a real app, this would use an AI API
    if (lowerMessage.includes('food') || lowerMessage.includes('hungry') || lowerMessage.includes('meal')) {
      const foodResource = mockResources.find((r) => r.category === 'Emergency Aid' && r.name.includes('Food'))
      return `I found a great resource for food assistance! ${foodResource?.name || 'Community Food Bank'} provides nutritious meals and groceries. Would you like me to show you more details?`
    }

    if (lowerMessage.includes('housing') || lowerMessage.includes('shelter') || lowerMessage.includes('home')) {
      const housingResource = mockResources.find((r) => r.category === 'Emergency Aid' && r.name.includes('Housing'))
      return `I can help with housing! ${housingResource?.name || 'Housing Assistance Network'} offers emergency shelter and rental assistance. This is available 24/7. Should I connect you with them?`
    }

    if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage.includes('doctor')) {
      const healthResource = mockResources.find((r) => r.category === 'Health Support')
      return `For health services, I recommend ${healthResource?.name || 'Family Wellness Center'}. They offer primary care, mental health counseling, and wellness programs. Would you like their contact information?`
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('tutoring')) {
      const eduResource = mockResources.find((r) => r.category === 'Education')
      return `Great! ${eduResource?.name || 'Youth Education Hub'} provides after-school programs, tutoring, and college prep. They're open after school hours. Should I show you their details?`
    }

    if (lowerMessage.includes('emergency') || lowerMessage.includes('crisis') || lowerMessage.includes('urgent')) {
      return `For urgent situations, I recommend contacting the Housing Assistance Network (available 24/7) or calling 911 for immediate emergencies. Would you like me to show you all emergency resources?`
    }

    return `I understand you're looking for help. Could you tell me a bit more about what specific type of support you need? I can help with food, housing, health, education, and more.`
  }

  const handleSend = (message?: string) => {
    const userMessage = message || input.trim()
    if (!userMessage) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(userMessage)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl mb-4 shadow-warm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
            AI Community Concierge
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Not sure where to start? Tell me what you need help with, and I&apos;ll guide you to the right resources.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-secondary-500 text-white'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-500 text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Suggestions (only show if first message) */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <p className="text-sm text-neutral-500 mb-3">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => handleQuickSuggestion(suggestion.text)}
                      className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:border-primary-500 hover:text-primary-600 transition-all"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-200 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center space-x-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-warm"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Need immediate help?{' '}
            <Link href="/directory?category=Emergency+Aid" className="text-primary-600 hover:text-primary-700 font-medium">
              View emergency resources
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

