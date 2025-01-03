'use client'

import { Button } from "@/app/components/ui/button"
import { Book, Share2, Twitter, Facebook, Link, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from "@/app/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@/app/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import type { ScriptureResponse } from '@/app/lib/scripture-generation'
import { useState } from 'react'

interface ScriptureDialogProps {
  scripture: ScriptureResponse
  onShare: () => void
}

export function ScriptureDialog({ scripture, onShare }: ScriptureDialogProps) {
  const { toast } = useToast()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const shareText = `${scripture.verse}\n"${scripture.text}"\n\n${scripture.context}`

  const handleShare = async (e: React.MouseEvent, platform: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownOpen(false)
    
    const shareUrl = window.location.href
    const text = `${shareText}\n\n${shareUrl}`
    
    try {
      switch (platform) {
        case 'native':
          await navigator.share({
            title: scripture.verse,
            text: shareText,
            url: shareUrl
          })
          break
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
          window.open(twitterUrl, '_blank')
          break
        case 'facebook':
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`
          window.open(fbUrl, '_blank')
          break
        case 'email':
          const mailtoUrl = `mailto:?subject=${encodeURIComponent(scripture.verse)}&body=${encodeURIComponent(text)}`
          window.location.href = mailtoUrl
          break
        case 'copy':
          await navigator.clipboard.writeText(text)
          toast({
            title: "Copied!",
            description: "Scripture has been copied to your clipboard"
          })
          return
      }
      
      toast({
        title: `Sharing to ${platform}`,
        description: "Opening share window..."
      })
    } catch (err) {
      console.error('Share error:', err)
      toast({
        title: "Share Failed",
        description: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 -ml-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
        >
          <Book className="h-3.5 w-3.5 mr-1.5" />
          Scripture
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" />
        <DialogContent className="fixed left-[50%] top-[50%] z-[10000] translate-x-[-50%] translate-y-[-50%] border bg-white rounded-lg shadow-lg w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{scripture.verse}</DialogTitle>
            <DialogDescription className="sr-only">
              Scripture verse and sharing options
            </DialogDescription>
          </DialogHeader>
          <div className="relative p-6">
            <div className="flex items-center justify-end mb-4">
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 p-0 hover:bg-muted"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  alignOffset={-5}
                  sideOffset={8}
                  className="w-48 z-[10001] bg-white border rounded-md shadow-md py-1"
                >
                  {typeof window !== 'undefined' && 'share' in navigator && (
                    <DropdownMenuItem 
                      onClick={(e) => handleShare(e, 'native')}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share...</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={(e) => handleShare(e, 'twitter')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Share on Twitter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => handleShare(e, 'facebook')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Share on Facebook</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => handleShare(e, 'email')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Share via Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => handleShare(e, 'copy')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link className="h-4 w-4" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-4">
              <motion.blockquote 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-l-4 border-primary/30 pl-4 italic text-lg"
              >
                "{scripture.text}"
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground"
              >
                {scripture.context}
              </motion.p>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

