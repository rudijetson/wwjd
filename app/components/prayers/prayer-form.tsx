'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Send } from 'lucide-react'
import { Textarea } from "@/app/components/ui/textarea"
import { PRAYER_TYPES } from '../../constants/prayer-types'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from "@/app/components/ui/badge"
import { useToast } from "@/app/components/ui/use-toast"
import { ToastAction } from "@/app/components/ui/toast"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/app/components/ui/toggle-group"
import { generateScripture } from '@/app/lib/scripture-generation'
import { getPlaceholderText, sortPrayerTypes } from './utils'
import type { Prayer, PrayerType } from './types'

interface PrayerFormProps {
  onPrayerSubmit: (prayer: Prayer) => void
}

const SORTED_PRAYER_TYPES = sortPrayerTypes(PRAYER_TYPES)

// Add color mapping for prayer types
const PRAYER_TYPE_COLORS: Record<string, { base: string, hover: string, text: string, ring: string, selected: string }> = {
  praise: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-yellow-50',
    text: 'text-yellow-600',
    ring: 'ring-yellow-200',
    selected: 'bg-yellow-100'
  },
  gratitude: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-green-50',
    text: 'text-green-600',
    ring: 'ring-green-200',
    selected: 'bg-green-100'
  },
  support: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-blue-50',
    text: 'text-blue-600',
    ring: 'ring-blue-200',
    selected: 'bg-blue-100'
  },
  testimony: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-purple-50',
    text: 'text-purple-600',
    ring: 'ring-purple-200',
    selected: 'bg-purple-100'
  },
  encouragement: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-orange-50',
    text: 'text-orange-600',
    ring: 'ring-orange-200',
    selected: 'bg-orange-100'
  },
  general: { 
    base: 'bg-transparent', 
    hover: 'hover:bg-gray-50',
    text: 'text-gray-600',
    ring: 'ring-gray-200',
    selected: 'bg-gray-100'
  }
};

export function PrayerForm({ onPrayerSubmit }: PrayerFormProps) {
  const [selectedType, setSelectedType] = useState<PrayerType | "">("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const MIN_CHARS = 10
  const MAX_CHARS = 500
  const charCount = content.length
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS

  const handleTypeChange = (value: string) => {
    setSelectedType(value as PrayerType)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit triggered')
    
    if (!selectedType || !content.trim()) {
      console.log('Validation failed - missing type or content')
      toast({
        title: "Error",
        description: "Please select a prayer type and enter your prayer.",
        variant: "destructive",
      })
      return
    }

    if (!isValidLength) {
      console.log('Validation failed - invalid length')
      toast({
        title: "Error",
        description: `Prayer must be between ${MIN_CHARS} and ${MAX_CHARS} characters.`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Generating scripture...')
      const scripture = await generateScripture(content.trim(), selectedType)
      console.log('Scripture generated:', scripture)

      const newPrayer: Prayer = {
        id: Date.now(),
        type: selectedType,
        content: content.trim(),
        likes: 0,
        timestamp: 'Just now',
        isNew: true,
        scripture
      }

      console.log('New prayer created:', newPrayer)
      onPrayerSubmit(newPrayer)

      console.log('Showing success toast')
      toast({
        title: "Amen! 🙏",
        description: "Your prayer has been shared with the community",
        duration: 1500,
      })

      setSelectedType("")
      setContent("")
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Error",
        description: "Failed to share prayer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Share Your Prayer</CardTitle>
        <CardDescription>
          Select a type of prayer below and share your heart with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {selectedType ? 'Prayer Type:' : 'Select Prayer Type:'}
              </label>
              <ToggleGroup 
                type="single" 
                value={selectedType}
                onValueChange={handleTypeChange}
                className="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
              >
                {Object.entries(SORTED_PRAYER_TYPES).map(([value, label]) => {
                  const colors = PRAYER_TYPE_COLORS[value] || PRAYER_TYPE_COLORS.general;
                  return (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={value}
                      className={`
                        flex justify-center items-center h-8 px-3
                        transition-all duration-200 rounded-md
                        ${colors.base}
                        ${selectedType === value 
                          ? `${colors.selected} ${colors.text} ring-1 ${colors.ring} shadow-sm` 
                          : `${colors.hover} text-muted-foreground/70`
                        }
                      `}
                    >
                      <span className={`
                        text-xs font-medium cursor-pointer
                        transition-colors duration-200
                        ${selectedType === value 
                          ? colors.text
                          : ''
                        }
                      `}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>

            <AnimatePresence>
              {selectedType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-muted-foreground">
                      Your Prayer:
                    </label>
                    <span className={`text-xs ${
                      !content.length 
                        ? 'text-muted-foreground/50'
                        : !isValidLength 
                          ? 'text-red-500'
                          : 'text-green-500'
                    }`}>
                      {charCount}/{MAX_CHARS} characters
                      {content.length > 0 && !isValidLength && (
                        <span className="ml-1 text-red-500">
                          (minimum {MIN_CHARS})
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="relative">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={getPlaceholderText(selectedType)}
                      className={`min-h-[120px] resize-none bg-white/50 pr-16 text-sm ${
                        content.length > 0 && !isValidLength ? 'border-red-200 focus-visible:ring-red-500' : ''
                      }`}
                      maxLength={MAX_CHARS}
                    />
                    <Button 
                      type="submit"
                      size="sm"
                      className="absolute bottom-2 right-2 h-7 w-7 p-0 transition-all hover:scale-105 hover:shadow-sm"
                      disabled={isSubmitting || !content.trim() || !isValidLength}
                    >
                      {isSubmitting ? (
                        <Send className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Send className="h-3.5 w-3.5" />
                      )}
                      <span className="sr-only">Submit Prayer</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

