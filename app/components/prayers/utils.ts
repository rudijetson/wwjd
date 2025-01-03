import { PrayerType } from './types'

export const getPlaceholderText = (type: PrayerType): string => {
  switch (type) {
    case 'praise':
      return "Share a moment of praise or worship..."
    case 'gratitude':
      return "Share what you're thankful for..."
    case 'support':
      return "Share what you need prayer support for..."
    case 'testimony':
      return "Share how God has worked in your life..."
    case 'encouragement':
      return "Share words to uplift others..."
    case 'general':
      return "Share what's on your heart..."
    default:
      return "Share your prayer..."
  }
}

export const formatTimestamp = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export const sortPrayerTypes = <T extends Record<string, unknown>>(types: T): T => {
  return Object.entries(types)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as T)
} 