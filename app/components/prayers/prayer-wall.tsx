'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Heart, Menu } from 'lucide-react'
import { Badge } from "@/app/components/ui/badge"
import { useToast } from "@/app/components/ui/use-toast"
import { ToastAction } from "@/app/components/ui/toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { motion, AnimatePresence } from 'framer-motion'
import { PRAYER_TYPES } from '../../constants/prayer-types'
import { sortPrayerTypes } from './utils'
import { PrayerForm } from './prayer-form'
import { PrayerCard } from './prayer-card'
import type { Prayer } from './types'

const INITIAL_PRAYERS: Prayer[] = [
  {
    id: 1,
    type: 'praise',
    content: 'Grateful for God\'s endless love and mercy. His grace continues to amaze me every day.',
    likes: 12,
    timestamp: '2 hours ago',
    isNew: false,
    scripture: {
      verse: "Psalm 136:1",
      text: "Give thanks to the Lord, for he is good. His love endures forever.",
      context: "This psalm emphasizes God's enduring love and mercy, encouraging believers to be thankful for His constant presence and goodness.",
      application: "Take time each day to reflect on and give thanks for God's enduring love and mercy in your life."
    }
  },
  {
    id: 2,
    type: 'support',
    content: 'Please pray for my family during this difficult time. My mother is undergoing surgery next week.',
    likes: 8,
    timestamp: '4 hours ago',
    isNew: false,
    scripture: {
      verse: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      context: "God promises His presence and support during difficult times, offering strength and help to those who trust in Him.",
      application: "Trust in God's presence and strength during medical challenges, knowing He is with you and your loved ones."
    }
  },
  {
    id: 3,
    type: 'gratitude',
    content: 'Thankful for my church community and their constant support. They truly show Christ\'s love in action.',
    likes: 15,
    timestamp: '6 hours ago',
    isNew: false,
    scripture: {
      verse: "1 Thessalonians 5:11",
      text: "Therefore encourage one another and build each other up, just as in fact you are doing.",
      context: "Paul reminds us of the importance of community and mutual encouragement among believers.",
      application: "Actively participate in and contribute to your faith community, both giving and receiving support and encouragement."
    }
  },
  {
    id: 4,
    type: 'encouragement',
    content: 'To anyone feeling lost or discouraged today: Remember that God is with you, and His love never fails. Keep holding onto faith.',
    likes: 20,
    timestamp: '8 hours ago',
    isNew: false,
    scripture: {
      verse: "Joshua 1:9",
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      context: "God encourages Joshua, reminding him of His constant presence and support in all circumstances.",
      application: "Face your challenges with courage, knowing that God's presence and support are constant in your life."
    }
  },
  {
    id: 5,
    type: 'testimony',
    content: 'God answered my prayers for a job! After months of searching, He opened a door I never expected. His timing is perfect.',
    likes: 18,
    timestamp: '12 hours ago',
    isNew: false,
    scripture: {
      verse: "Psalm 34:8",
      text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.",
      context: "David shares his personal experience of God's goodness and encourages others to trust in the Lord.",
      application: "Share your experiences of God's faithfulness to encourage others and strengthen their faith."
    }
  },
  {
    id: 6,
    type: 'support',
    content: 'Seeking prayers for wisdom and guidance as I make important decisions about my future. Need God\'s direction.',
    likes: 10,
    timestamp: '1 day ago',
    isNew: false,
    scripture: {
      verse: "James 1:5",
      text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      context: "James encourages believers to seek God's wisdom, assuring them of His generous response to sincere requests.",
      application: "Approach God confidently in prayer when seeking wisdom, trusting in His generous guidance for your decisions."
    }
  }
]

const SORTED_PRAYER_TYPES = sortPrayerTypes(PRAYER_TYPES)

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>(INITIAL_PRAYERS)
  const [filter, setFilter] = useState<string>("all")
  const [likedPrayers, setLikedPrayers] = useState<number[]>([])
  const { toast } = useToast()

  const filteredPrayers = filter === "all" 
    ? prayers 
    : prayers.filter(prayer => prayer.type === filter)

  const handlePrayerSubmit = (newPrayer: Prayer) => {
    setPrayers(prevPrayers => [newPrayer, ...prevPrayers])
  }

  const handleLike = (id: number) => {
    setPrayers(prevPrayers => 
      prevPrayers.map(prayer => 
        prayer.id === id 
          ? { ...prayer, likes: prayer.likes + (likedPrayers.includes(id) ? -1 : 1) }
          : prayer
      )
    )
    
    setLikedPrayers(prev => {
      const newLiked = prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
      
      if (!prev.includes(id)) {
        toast({
          title: "Amen! 🙏",
          description: "You've joined in prayer for this intention",
          duration: 3000,
        })
      }
      
      return newLiked
    })
  }

  const handleShare = async (id: number) => {
    const prayer = prayers.find(p => p.id === id)
    if (!prayer) return

    try {
      if (!navigator.share) {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(prayer.content)
        toast({
          title: "Copied to clipboard",
          description: "Prayer content has been copied to your clipboard.",
          duration: 3000,
        })
        return
      }

      await navigator.share({
        title: 'Share Prayer',
        text: prayer.content,
        url: window.location.href,
      })
    } catch (err) {
      console.error('Error sharing:', err)
      toast({
        title: "Error",
        description: "Failed to share prayer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="border-none bg-gradient-to-b from-primary/2 to-primary/5">
      <CardHeader className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Prayer Wall</CardTitle>
          <CardDescription className="text-base italic">
            "And pray in the Spirit on all occasions with all kinds of prayers and requests." 
            - Ephesians 6:18
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <PrayerForm onPrayerSubmit={handlePrayerSubmit} />

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">Recent Prayers</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 h-7 px-2 -ml-2">
                      <Menu className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {filter === "all" ? "All Types" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </span>
                      {filter !== "all" && (
                        <Badge variant="default" className="h-1.5 w-1.5 p-0 rounded-full bg-primary" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      className={filter === "all" ? "bg-primary/10" : ""}
                      onClick={() => setFilter("all")}
                    >
                      All Prayers
                    </DropdownMenuItem>
                    {Object.entries(SORTED_PRAYER_TYPES).map(([value]) => (
                      <DropdownMenuItem
                        key={value}
                        className={filter === value ? "bg-primary/10" : ""}
                        onClick={() => setFilter(value)}
                      >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 fill-red-500/50 text-red-500/50" />
                  <span>{prayers.reduce((total, prayer) => total + prayer.likes, 0)} people praying</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/25" />
                <span>{prayers.length} prayers shared</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPrayers.map((prayer, index) => (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                >
                  <PrayerCard
                    prayer={prayer}
                    isLiked={likedPrayers.includes(prayer.id)}
                    onLike={handleLike}
                    onShare={handleShare}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

