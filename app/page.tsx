import GuidanceSection from '@/app/components/guidance-section'
import PrayerWall from '@/app/components/prayers/prayer-wall'
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
              What Would Jesus Do?
            </CardTitle>
          </CardHeader>
        </Card>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <GuidanceSection />
          <PrayerWall />
        </div>
      </div>
    </main>
  )
}

