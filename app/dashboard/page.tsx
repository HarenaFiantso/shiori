'use client';

import { NotesSection, QuickStats, TasksSection, WelcomeHeader } from '@/components/dashboard';
import { motion } from 'motion/react';

export default function Dashboard() {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <WelcomeHeader />
      <QuickStats />
      <div className="grid gap-6 lg:grid-cols-2">
        <TasksSection />
        <div className="space-y-6">
          <NotesSection />
        </div>
      </div>
    </motion.div>
  );
}
