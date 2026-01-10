'use client'

import { motion } from 'motion/react'

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
            >
              <span className="text-primary font-bold text-2xl">栞</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-4xl font-semibold mb-6"
            >
              Why <span className="gradient-text">Shiori</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8"
            >
              "Shiori" (栞) means "bookmark" in Japanese — a simple marker that helps you find your place. 
              Like a bookmark, Shiori helps you keep track of what matters without getting in the way.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              We believe productivity tools should feel calm, not chaotic. Shiori is designed with 
              intention — every feature serves a purpose, every interaction feels natural.
            </motion.p>
          </div>
        </div>
      </section>
  )
}