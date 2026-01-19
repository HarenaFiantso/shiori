'use client';

import { motion } from 'motion/react';

const COMPLETION_ANIMATION_DURATION = 0.5;
const COMPLETION_ANIMATION_DELAY = 0.3;

export function ProgressBar({ completionRate }: { completionRate: number }) {
  return (
    <div className="mb-6">
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionRate}%` }}
          transition={{
            duration: COMPLETION_ANIMATION_DURATION,
            ease: 'easeOut',
            delay: COMPLETION_ANIMATION_DELAY,
          }}
        />
      </div>
    </div>
  );
}
