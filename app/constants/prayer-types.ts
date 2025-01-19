export const PRAYER_TYPES = {
  praise: "Praise & Worship",
  gratitude: "Gratitude",
  support: "Support Needed",
  testimony: "Testimony",
  encouragement: "Encouragement",
  general: "General Prayer"
} as const

export type PrayerType = keyof typeof PRAYER_TYPES

