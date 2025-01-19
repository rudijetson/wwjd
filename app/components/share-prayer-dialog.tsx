'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Textarea } from "@/app/components/ui/textarea"
import { PRAYER_TYPES, type PrayerType } from '../constants/prayer-types'
import { Heart, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PRAYER_TYPE_COLORS: Record<PrayerType, string> = {
  praise: "bg-amber-500 hover:bg-amber-400",
  gratitude: "bg-emerald-500 hover:bg-emerald-400",
  support: "bg-sky-500 hover:bg-sky-400",
  testimony: "bg-violet-500 hover:bg-violet-400",
  encouragement: "bg-rose-500 hover:bg-rose-400",
  general: "bg-orange-500 hover:bg-orange-400"
}

interface SharePrayerDialogProps {
  onPrayerSubmit: (prayer: { type: string; content: string }) => void
}

export function SharePrayerDialog({ onPrayerSubmit }: SharePrayerDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<PrayerType | "">("")
  const [prayer, setPrayer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedType || !prayer) return
    
    setIsSubmitting(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onPrayerSubmit({
      type: selectedType,
      content: prayer
    })
    
    // Reset form and close dialog
    setSelectedType("")
    setPrayer("")
    setIsSubmitting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Heart className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Prayer</DialogTitle>
          <DialogDescription>
            Select a type of prayer below and share your heart with the community
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(PRAYER_TYPES).map(([type, label]) => (
              <Button
                key={type}
                variant="ghost"
                className={`
                  h-auto py-3 px-4 flex flex-col items-center justify-center gap-1 transition-all duration-300
                  ${PRAYER_TYPE_COLORS[type as PrayerType]}
                  ${selectedType === type ? 'ring-2 ring-white/20 shadow-lg scale-105' : ''}
                  text-white hover:scale-105
                `}
                onClick={() => setSelectedType(type as PrayerType)}
              >
                <span className="text-sm font-medium">{label}</span>
              </Button>
            ))}
          </div>

          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Textarea
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  placeholder={PRAYER_TYPES[selectedType]}
                  className="min-h-[150px] resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {selectedType && prayer && (
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sharing prayer...
                </>
              ) : (
                'Share Prayer'
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

