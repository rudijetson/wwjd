'use client'

import { Badge } from "@/app/components/ui/badge"
import { PRAYER_TYPES, type PrayerType } from '@/constants/prayer-types'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface PrayerFilterProps {
  value: string
  onChange: (value: string) => void
}

type ExtendedPrayerType = PrayerType | 'all'

const PRAYER_TYPE_COLORS: Record<ExtendedPrayerType, string> = {
  all: "bg-zinc-700 hover:bg-zinc-600",
  praise: "bg-amber-500 hover:bg-amber-400",
  gratitude: "bg-emerald-500 hover:bg-emerald-400",
  support: "bg-sky-500 hover:bg-sky-400",
  testimony: "bg-violet-500 hover:bg-violet-400",
  encouragement: "bg-rose-500 hover:bg-rose-400",
  general: "bg-orange-500 hover:bg-orange-400"
}

export function PrayerFilter({ value, onChange }: PrayerFilterProps) {
  const allPrayerTypes: Record<ExtendedPrayerType, string> = {
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
      {(Object.entries(allPrayerTypes) as [ExtendedPrayerType, string][]).map(([type, label]) => (
        <Badge
          key={type}
          variant="custom"
          className={cn(
            "cursor-pointer transition-all duration-300 hover:scale-105 px-4 py-2 text-sm text-white border-0 shadow-sm",
            PRAYER_TYPE_COLORS[type],
            value === type && "ring-2 ring-white/20 shadow-lg scale-105"
          )}
          onClick={() => onChange(type)}
        >
          {type === 'all' ? label : type.charAt(0).toUpperCase() + type.slice(1)}
          {value === type && (
            <motion.span
              layoutId="activeIndicator"
              className="absolute inset-0 bg-white/10 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Badge>
      ))}
    </motion.div>
  )
}

