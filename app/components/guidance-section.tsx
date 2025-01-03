'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Textarea } from "@/app/components/ui/textarea"
import { Loader2, Copy, CheckCheck, Cross } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import type { ScriptureResponse } from '@/app/lib/scripture-generation'
import { useToast } from "@/app/components/ui/use-toast"

export default function GuidanceSection() {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [completion, setCompletion] = useState<ScriptureResponse | null>(null)
  const [question, setQuestion] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  
  const MIN_CHARS = 25
  const MAX_CHARS = 500
  const charCount = question.length
  const remainingChars = MAX_CHARS - charCount
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!question.trim()) return
    
    if (!isValidLength) {
      toast({
        title: "Error",
        description: `Question must be between ${MIN_CHARS} and ${MAX_CHARS} characters.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError(null)
    setCompletion(null)
    
    try {
      console.log('Sending request to guidance API...')
      const response = await fetch('/api/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim() }),
      })
      
      const data = await response.json()
      console.log('Received response:', data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get guidance')
      }
      
      // Validate the response structure
      if (!data.verse || !data.text || !data.context || !data.application) {
        throw new Error('Invalid response received from server')
      }
      
      setCompletion(data)
      
      // Show success toast
      toast({
        title: "Guidance Received",
        description: "Scripture and interpretation have been provided below.",
        variant: "default",
      })
    } catch (error) {
      console.error('Error getting guidance:', error)
      const message = error instanceof Error ? error.message : 'Failed to get guidance'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= MAX_CHARS) {
      setQuestion(value)
      setError(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatResponse = (response: ScriptureResponse): string => {
    return `Scripture Reference: ${response.verse}
"${response.text}"

Context:
${response.context}

Application:
${response.application}`
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-b from-primary/2 to-primary/5">
      <CardHeader className="space-y-6 pb-8">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-indigo-100 h-12 w-12 flex items-center justify-center">
            <Cross className="h-6 w-6 text-indigo-500" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <CardDescription className="text-base">
            Seek guidance from Jesus&apos; teachings for your modern-day situations. Share your question below and receive relevant scripture and interpretation.
            <span className="block mt-1 text-sm text-yellow-600/60 font-light">More detailed questions often receive more specific guidance.</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              name="question"
              value={question}
              onChange={handleQuestionChange}
              placeholder="What would Jesus do in your situation? Share your modern-day challenge or dilemma..."
              className={cn(
                "min-h-[120px] resize-none border-primary/20 bg-white/50 placeholder:text-muted-foreground/70",
                error && "border-red-500",
                !isValidLength && charCount > 0 && "border-yellow-500"
              )}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="space-x-2">
                <span className={cn(
                  "transition-colors",
                  charCount > 0 && !isValidLength && "text-yellow-600",
                  remainingChars <= 20 && "text-red-500"
                )}>
                  {charCount} / {MAX_CHARS} characters
                </span>
                {charCount > 0 && !isValidLength && (
                  <span className="text-yellow-600">
                    (Minimum {MIN_CHARS} characters)
                  </span>
                )}
              </div>
              {error && <span className="text-red-500">{error}</span>}
            </div>
          </div>
          <Button 
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02]"
            size="lg"
            disabled={isLoading || !question.trim() || !isValidLength}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Finding divine guidance...
              </>
            ) : (
              'Seek Guidance'
            )}
          </Button>
        </form>

        <AnimatePresence mode="wait">
          {completion && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(formatResponse(completion))}
                  className={cn(
                    "absolute right-4 top-4 transition-all duration-200",
                    copied && "text-green-600"
                  )}
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <div className="prose prose-slate prose-sm max-w-none">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary">
                      Scripture Reference: {completion.verse}
                    </h3>
                    <blockquote className="mt-2 border-l-4 border-primary/30 pl-4 italic">
                      {completion.text}
                    </blockquote>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-primary/80">
                      Context:
                    </h4>
                    <p className="text-muted-foreground">
                      {completion.context}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-primary/80">
                      Application:
                    </h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {completion.application}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {isLoading && !completion && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <div className="text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <Loader2 className="w-16 h-16 animate-spin text-primary/40" />
                  <Cross className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Seeking divine wisdom...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

