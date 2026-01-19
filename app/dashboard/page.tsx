'use client';

import { HabitSection, NotesSection, QuickStats, TaskSection } from '@/components/dashboard';
import { getDate, getGreeting } from '@/components/utils';
import { useAuth } from '@/hooks';
import { motion } from 'motion/react';

function WelcomeHeader() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-8"
    >
      <p className="text-muted-foreground mb-1 text-sm">{getDate()}</p>
      <h1 className="text-foreground text-3xl font-semibold">
        {getGreeting()} {user?.user_metadata.display_name.split(' ')[0]},{' '}
        <span className="text-primary">welcome back</span>
      </h1>
      <p className="text-muted-foreground mt-2">Here's what's on your mind today.</p>
    </motion.div>
  );
}

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
        <TaskSection />
        <div className="space-y-6">
          <NotesSection />
          <HabitSection />
        </div>
      </div>
    </motion.div>
  );
}
