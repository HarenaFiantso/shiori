'use client';

import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function CTA() {
  const router = useRouter();

  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-6 text-3xl font-semibold sm:text-4xl">Ready to find your focus?</h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Join thousands of people who use Shiori to organize their thoughts and get things done.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="bg-primary text-primary-foreground group shadow-primary/20 mx-auto flex items-center justify-center gap-2 rounded-2xl px-10 py-4 font-medium shadow-lg transition-all hover:opacity-90"
        >
          Get started — it's free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
}
