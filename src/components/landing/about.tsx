'use client';

import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="bg-card/30 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-primary/10 mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
          >
            <span className="text-primary text-2xl font-bold">栞</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mb-6 text-3xl font-semibold sm:text-4xl"
          >
            Why <span className="gradient-text">Shiori</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed"
          >
            "Shiori" (栞) means "bookmark" in Japanese — a simple marker that helps you find your place. Like a
            bookmark, Shiori helps you keep track of what matters without getting in the way.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="text-muted-foreground mx-auto max-w-2xl leading-relaxed"
          >
            We believe productivity tools should feel calm, not chaotic. Shiori is designed with intention — every
            feature serves a purpose, every interaction feels natural.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
