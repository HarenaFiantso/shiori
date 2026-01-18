import { ElementType } from 'react';

import { cn } from '@/lib/utils';
import { BookOpen, Check, Droplets, Flame, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface Habit {
  id: string;
  name: string;
  icon: ElementType;
  streak: number;
  completed: boolean;
  target: string;
}

const habits: Habit[] = [
  { id: '1', name: 'Meditation', icon: Moon, streak: 12, completed: true, target: '10 mins' },
  { id: '2', name: 'Reading', icon: BookOpen, streak: 5, completed: false, target: '30 mins' },
  { id: '3', name: 'Hydration', icon: Droplets, streak: 8, completed: true, target: '8 glasses' },
];

const HabitCard = ({ habit, index }: { habit: Habit; index: number }) => {
  const Icon = habit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'cursor-pointer rounded-xl p-4 transition-all duration-200',
        habit.completed ? 'bg-primary/10 border-primary/20 border' : 'shiori-surface-interactive'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              habit.completed ? 'bg-primary' : 'bg-muted'
            )}
          >
            <Icon className={cn('h-5 w-5', habit.completed ? 'text-primary-foreground' : 'text-muted-foreground')} />
          </div>
          <div>
            <h3 className="text-foreground text-sm font-medium">{habit.name}</h3>
            <p className="text-muted-foreground text-xs">{habit.target}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <Flame className="text-shiori-warning h-3.5 w-3.5" />
            <span className="text-muted-foreground font-medium">{habit.streak}</span>
          </div>
          <motion.div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full',
              habit.completed ? 'bg-primary' : 'border-muted-foreground/30 border-2'
            )}
            whileTap={{ scale: 0.9 }}
          >
            {habit.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Check className="text-primary-foreground h-3.5 w-3.5" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function HabitSection() {
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="shiori-card p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-semibold">Daily Habits</h2>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {completedCount} of {habits.length} completed today
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {habits.map((habit, index) => (
          <HabitCard key={habit.id} habit={habit} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
