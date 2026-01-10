'use client';

import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-background absolute inset-0" />
      <motion.div
        className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full opacity-90"
        style={{
          background: 'radial-gradient(circle, hsl(16 72% 60% / 0.25) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full opacity-80"
        style={{
          background: 'radial-gradient(circle, hsl(30 80% 70% / 0.35) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute right-1/3 bottom-0 h-[400px] w-[400px] rounded-full opacity-75"
        style={{
          background: 'radial-gradient(circle, hsl(200 50% 70% / 0.25) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
