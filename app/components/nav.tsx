import Link from 'next/link'
import { Button } from "@/app/components/ui/button"
import { Cross, Info } from 'lucide-react'

export function Nav() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/"
              className="flex items-center gap-2.5 font-semibold transition-colors hover:text-primary"
            >
              <Cross className="h-5 w-5" />
              <span>WWJD</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="gap-2">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 