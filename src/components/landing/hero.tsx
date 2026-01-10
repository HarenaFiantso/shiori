'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

import { AppPreview } from './app-preview';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const router = useRouter();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <span className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Your personal knowledge hub
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl"
        >
          Organize your mind,
          <br />
          <span className="gradient-text">beautifully.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg"
        >
          Shiori is a calm, minimal workspace for your tasks, notes, and habits. Designed for clarity. Built for focus.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => router.push('/login')}
            className="bg-primary text-primary-foreground group shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 font-medium shadow-lg transition-all hover:opacity-90 sm:w-auto"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="bg-card text-foreground border-border hover:bg-secondary w-full rounded-2xl border px-8 py-4 font-medium transition-colors sm:w-auto">
            See how it works
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="from-background via-background/80 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t to-transparent" />
          <AppPreview />
        </motion.div>
      </motion.div>
    </section>
  );
}
