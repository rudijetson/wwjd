import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/app/components/ui/toaster"
import { Nav } from "@/app/components/nav"

export const metadata: Metadata = {
  title: 'WWJD - What Would Jesus Do? | Biblical Guidance for Modern Life',
  description: 'Get divine guidance through scripture for your daily challenges. WWJD helps you find biblical wisdom and share prayers with a supportive Christian community.',
  keywords: 'WWJD, What Would Jesus Do, Bible guidance, Christian community, prayer wall, scripture guidance, biblical wisdom, Christian advice, spiritual guidance',
  authors: [{ name: 'WWJD Community' }],
  openGraph: {
    type: 'website',
    title: 'WWJD - What Would Jesus Do?',
    description: 'Find biblical guidance and share prayers with a supportive Christian community.',
    url: 'https://wwjd.vercel.app',
    siteName: 'WWJD',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WWJD - What Would Jesus Do?'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WWJD - What Would Jesus Do?',
    description: 'Find biblical guidance and share prayers with a supportive Christian community.',
    images: ['/og-image.png']
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://wwjd.vercel.app" />
      </head>
      <body>
        <Nav />
        <main className="min-h-[calc(100vh-3.5rem)] pt-6">{children}</main>
        <div id="dialog-root" />
        <Toaster />
      </body>
    </html>
  )
}
