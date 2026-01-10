'use client';

import { CheckCircle2, FileText, Sparkles, Target } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Task Management',
    description: 'Organize your daily tasks with a clean, distraction-free interface. Focus on what matters most.',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: FileText,
    title: 'Smart Notes',
    description: 'Capture thoughts instantly. Your ideas, organized beautifully.',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    icon: Sparkles,
    title: 'Habit Tracking',
    description: 'Build lasting habits with gentle reminders and streak tracking.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Target,
    title: 'Focus Sessions',
    description: 'Deep work made simple with built-in focus timer.',
    className: 'md:col-span-1 md:row-span-1',
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold sm:text-4xl">
            Everything you need,
            <br />
            <span className="text-muted-foreground">nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            A focused set of tools designed to help you think clearly and work intentionally.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bento-card group cursor-default ${feature.className}`}
            >
              <div className="bg-primary/10 group-hover:bg-primary/15 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
                <feature.icon className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
