import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/app/components/ui/toaster"
import { Nav } from "@/app/components/nav"

export const metadata: Metadata = {
  title: 'WWJD - What Would Jesus Do?',
  description: 'Seek divine guidance for modern challenges through scripture and community.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-[calc(100vh-3.5rem)] pt-6">{children}</main>
        <div id="dialog-root" />
        <Toaster />
      </body>
    </html>
  )
}
