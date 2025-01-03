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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { PRAYER_TYPES, type PrayerType } from '../constants/prayer-types'
import { Heart, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
          <DialogTitle>Share a Prayer</DialogTitle>
          <DialogDescription>
            Share your prayer with the community. Your words may bring comfort and strength to others.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select prayer type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PRAYER_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
                  placeholder={PRAYER_TYPES[selectedType as keyof typeof PRAYER_TYPES]}
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

