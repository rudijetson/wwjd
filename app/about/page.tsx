import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Cross, Heart, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: 'About WWJD | Biblical Guidance Platform',
  description: 'Learn how WWJD helps you find biblical wisdom and guidance for modern challenges. Join our Christian community for prayer support and spiritual growth.',
  openGraph: {
    title: 'About WWJD | Biblical Guidance Platform',
    description: 'Learn how WWJD helps you find biblical wisdom and guidance for modern challenges.',
  }
}

export default function AboutPage() {
  return (
    <div className="container max-w-[98%] sm:max-w-[95%] py-6 sm:py-12">
      <Card className="border-none bg-gradient-to-b from-primary/2 to-primary/5">
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-indigo-100 h-12 w-12 flex items-center justify-center">
              <Cross className="h-6 w-6 text-indigo-500" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">About WWJD</CardTitle>
            <CardDescription className="text-base">
              Seeking divine guidance for modern challenges through scripture and community
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mission Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              WWJD (What Would Jesus Do?) is a modern platform that bridges timeless biblical wisdom with contemporary challenges. 
              We aim to help believers find scriptural guidance for their daily decisions and foster a supportive prayer community.
            </p>
          </section>

          {/* How It Works Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">How It Works</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-primary/80">Divine Guidance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI-powered guidance system analyzes your question and provides relevant scripture passages, 
                  along with contextual understanding and practical applications. While AI assists in finding relevant 
                  scriptures, all guidance is firmly rooted in biblical teachings.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-primary/80">Prayer Wall</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Prayer Wall is a space for community support and shared faith. Share your prayers, 
                  support others through prayer, and witness how God works in the lives of fellow believers.
                  Each prayer is paired with relevant scripture to provide comfort and guidance.
                </p>
              </div>
            </div>
          </section>

          {/* Biblical Foundation */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Biblical Foundation</h2>
            <div className="space-y-4">
              <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, 
                and it will be given to you." - James 1:5
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                Every aspect of WWJD is grounded in scripture. While we use modern technology to help find relevant 
                passages, all guidance comes directly from God's Word. We encourage users to pray, seek wisdom, 
                and verify all guidance against scripture.
              </p>
            </div>
          </section>

          {/* Privacy & Trust */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Trust
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We respect the sacred nature of prayer and personal guidance. Your prayers and questions are shared 
              only as you choose. While we use AI to help find relevant scriptures, we maintain strict privacy 
              standards and do not store personal information beyond what's necessary for the prayer wall functionality.
            </p>
          </section>

          {/* Community Guidelines */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Community Guidelines
            </h2>
            <div className="space-y-2">
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain a supportive, respectful, and uplifting community. When participating:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed pl-4 space-y-2">
                <li>Share prayers and support with genuine care and respect</li>
                <li>Maintain the privacy and dignity of others in your prayers</li>
                <li>Focus on encouragement and building up the community</li>
                <li>Remember that this is a supplement to, not a replacement for, personal Bible study and prayer</li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
} 