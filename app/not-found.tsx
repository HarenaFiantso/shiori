'use client';

import Link from 'next/link';

import { AnimatedBackground } from '@/components/landing';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="from-primary/20 to-primary/5 border-primary/10 shadow-soft flex h-20 w-20 items-center justify-center rounded-2xl border bg-linear-to-br">
                <Bookmark className="text-primary h-10 w-10" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-primary/40 absolute -top-2 -right-2 h-3 w-3 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="bg-primary/30 absolute -bottom-1 -left-1 h-2 w-2 rounded-full"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <h1 className="text-foreground/10 font-raleway text-8xl font-bold tracking-tight select-none md:text-9xl">
              404
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-2"
          >
            <h2 className="text-foreground font-raleway mb-3 text-2xl font-semibold md:text-3xl">Page not found</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This bookmark seems to have wandered off.
              <br className="hidden sm:block" />
              Let's guide you back to familiar paths.
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-muted-foreground/50 mt-6 text-sm tracking-widest"
          >
            迷子のしおり
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-hover rounded-xl px-8 transition-all duration-300"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border/50 hover:bg-accent/50 rounded-xl px-8 transition-all duration-300"
              onClick={() => window.history.back()}
            >
              <button type="button" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </button>
            </Button>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="via-border mx-auto mt-16 h-px w-24 bg-linear-to-r from-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
