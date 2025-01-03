'use client'

import { Badge } from "@/app/components/ui/badge"
import { PRAYER_TYPES } from '@/constants/prayer-types'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface PrayerFilterProps {
  value: string
  onChange: (value: string) => void
}

export function PrayerFilter({ value, onChange }: PrayerFilterProps) {
  const allPrayerTypes = {
    all: "All Prayers",
    ...PRAYER_TYPES
  }

  return (
    <motion.div 
      className="flex flex-wrap gap-2 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Object.entries(allPrayerTypes).map(([type, label]) => (
        <Badge
          key={type}
          variant={value === type ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all duration-300 hover:scale-105 px-4 py-2 text-sm",
            value === type ? "bg-primary" : "hover:bg-primary/10"
          )}
          onClick={() => onChange(type)}
        >
          {type === 'all' ? label : type.charAt(0).toUpperCase() + type.slice(1)}
          {value === type && (
            <motion.span
              layoutId="activeIndicator"
              className="absolute inset-0 bg-primary/10 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Badge>
      ))}
    </motion.div>
  )
}

