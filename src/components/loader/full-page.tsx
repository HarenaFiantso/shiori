import { motion } from 'motion/react';

import { AnimatedBackground } from '../landing';

interface LoadingPageProps {
  message?: string;
}

export function FullPageLoader({ message = 'Loading...' }: LoadingPageProps) {
  return (
    <div className="font-raleway relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center gap-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-primary/10 shadow-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm"
        >
          <span className="text-primary text-4xl font-bold">栞</span>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">Shiori</h1>
          <p className="text-muted-foreground text-sm">{message}</p>
        </motion.div>

        {/* Elegant loading indicator */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="bg-primary/60 h-2 w-2 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-muted-foreground/50 text-xs tracking-[0.3em] uppercase"
        >
          お待ちください
        </motion.p>
      </motion.div>
      <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent" />
    </div>
  );
}
