export const PRAYER_TYPES = {
  praise: "Share your praise prayer",
  gratitude: "Share your gratitude prayer",
  support: "Share your prayer for support",
  testimony: "Share your testimony",
  encouragement: "Share words of encouragement",
  general: "Share a general prayer"
} as const

export type PrayerType = keyof typeof PRAYER_TYPES

