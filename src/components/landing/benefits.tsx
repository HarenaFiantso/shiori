"use client"

import { BookOpen, CheckCircle2, Clock, Feather, Sparkles, Target } from 'lucide-react';
import { motion } from 'motion/react';

const benefits = [
  { icon: Feather, text: "Minimal & calm interface" },
  { icon: Clock, text: "Quick capture, zero friction" },
  { icon: BookOpen, text: "All your knowledge in one place" },
  { icon: Target, text: "Stay focused on what matters" },
  { icon: Sparkles, text: "Build better habits daily" },
  { icon: CheckCircle2, text: "Track progress effortlessly" },
];

export function Benefits() {
  return (
    <section className="py-8 border-y border-border/50 bg-card/50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-card/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-card/90 to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: [0, -600] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 px-8 whitespace-nowrap"
          >
            {[...benefits, ...benefits].map((benefit, index) => (
              <div
                key={`${benefit.text}-${index}`}
                className="flex items-center gap-3 shrink-0"
              >
                <benefit.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
  )
}