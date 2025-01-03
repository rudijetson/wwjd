export interface Prayer {
  id: number
  type: string
  content: string
  likes: number
  timestamp: string
  isNew: boolean
  scripture?: {
    verse: string
    text: string
    context: string
  }
}

export interface PrayerFormData {
  type: string
  content: string
}

