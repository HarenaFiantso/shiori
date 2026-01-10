'use client';

import { motion } from 'motion/react';

export function Branding() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-primary/5 hidden items-center justify-center p-12 lg:flex lg:w-1/2"
    >
      <div className="max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <span className="text-primary-foreground text-xl font-bold">栞</span>
          </div>
          <span className="text-foreground text-2xl font-semibold">Shiori</span>
        </div>
        <h1 className="text-foreground mb-4 text-3xl font-semibold">
          Your calm space for <span className="text-primary">focused productivity</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Organize your thoughts, track your habits, and accomplish your goals with a beautifully minimal interface.
        </p>
      </div>
    </motion.div>
  );
}
