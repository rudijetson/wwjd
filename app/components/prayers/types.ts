export interface Scripture {
  verse: string
  text: string
  context: string
  application: string
}

export interface Prayer {
  id: number
  type: string
  content: string
  likes: number
  timestamp: string
  isNew: boolean
  scripture?: Scripture
}

export type PrayerType = 'praise' | 'gratitude' | 'support' | 'testimony' | 'encouragement' | 'general'

export interface PrayerFormData {
  type: PrayerType
  content: string
} 