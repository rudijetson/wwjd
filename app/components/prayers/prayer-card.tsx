'use client'

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ScriptureResponse } from '@/app/lib/scripture-generation'
import { ScriptureDialog } from './scripture-dialog'

interface Prayer {
  id: number
  type: string
  content: string
  likes: number
  timestamp: string
  isNew: boolean
  scripture?: ScriptureResponse
}

interface PrayerCardProps {
  prayer: Prayer
  isLiked: boolean
  onLike: (id: number) => void
  onShare: (id: number) => void
}

export function PrayerCard({ prayer, isLiked, onLike, onShare }: PrayerCardProps) {
  return (
    <Card className="h-full bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6 flex flex-col h-full"> 
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant={prayer.isNew ? "default" : "secondary"}>
              {prayer.type}
              {prayer.isNew && (
                <Sparkles className="h-3 w-3 ml-1 inline-block" />
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {prayer.timestamp}
            </span>
          </div>

          {/* Content */}
          <p className="text-sm group-hover:text-primary/80 transition-colors duration-300 flex-grow mb-4">
            {prayer.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-primary/10">
            <div className="flex-1">
              {prayer.scripture && (
                <ScriptureDialog 
                  scripture={prayer.scripture} 
                  onShare={() => onShare(prayer.id)}
                />
              )}
            </div>
            <button
              onClick={() => onLike(prayer.id)}
              className={`
                group flex items-center gap-1.5 text-xs 
                ${isLiked 
                  ? 'text-red-500'
                  : 'text-muted-foreground/70 hover:text-red-500'
                }
                transition-colors duration-300
              `}
            >
              <Heart 
                className={`h-3.5 w-3.5 ${
                  isLiked 
                    ? "fill-red-500 stroke-red-500" 
                    : "opacity-70 group-hover:opacity-100 group-hover:text-red-500"
                }`} 
              />
              <span className="font-medium">{prayer.likes}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

