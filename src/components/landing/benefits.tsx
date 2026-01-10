'use client';

import { BookOpen, CheckCircle2, Clock, Feather, Sparkles, Target } from 'lucide-react';
import { motion } from 'motion/react';

const benefits = [
  { icon: Feather, text: 'Minimal & calm interface' },
  { icon: Clock, text: 'Quick capture, zero friction' },
  { icon: BookOpen, text: 'All your knowledge in one place' },
  { icon: Target, text: 'Stay focused on what matters' },
  { icon: Sparkles, text: 'Build better habits daily' },
  { icon: CheckCircle2, text: 'Track progress effortlessly' },
];

export function Benefits() {
  return (
    <section className="border-border/50 bg-card/50 overflow-hidden border-y py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="from-card/90 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-linear-to-r to-transparent" />
        <div className="from-card/90 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-linear-to-l to-transparent" />
        <motion.div
          animate={{ x: [0, -600] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 px-8 whitespace-nowrap"
        >
          {[...benefits, ...benefits].map((benefit, index) => (
            <div key={`${benefit.text}-${index}`} className="flex shrink-0 items-center gap-3">
              <benefit.icon className="text-primary h-5 w-5" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
