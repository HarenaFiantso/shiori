'use client';

import { motion } from 'motion/react';

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-background/80 border-border/30 fixed top-0 right-0 left-0 z-50 border-b px-6 py-4 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <span className="text-primary text-lg font-bold">栞</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Shiori</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
          >
            About
          </a>
          <button className="bg-primary text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
