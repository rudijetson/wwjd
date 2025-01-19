'use client'

import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-muted-foreground border-t">
      <motion.div 
        className="flex items-center justify-center gap-1.5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Built by{" "}
        <Link 
          href="http://www.bzhoff.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-primary hover:text-primary/80 transition-colors relative group"
        >
          bzhoff
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
        </Link>{" "}
        with{" "}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Heart className="h-4 w-4 text-red-500 hover:text-red-400 transition-colors cursor-pointer" />
        </motion.div>
      </motion.div>
    </footer>
  )
} 