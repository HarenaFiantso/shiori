'use client'

import { motion } from 'motion/react'

export function Branding() {
  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12"
      >
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">栞</span>
            </div>
            <span className="font-semibold text-2xl text-foreground">Shiori</span>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Your calm space for <span className="text-primary">focused productivity</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your thoughts, track your habits, and accomplish your goals with a beautifully minimal interface.
          </p>
        </div>
      </motion.div>
  )
}