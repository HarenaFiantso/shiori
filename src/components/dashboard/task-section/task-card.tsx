import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Check, Clock, Flag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueTime?: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  index?: number;
}

const priorityColors = {
  low: 'text-shiori-success',
  medium: 'text-shiori-warning',
  high: 'text-destructive',
};

export function TaskCard({ task, onToggle, index = 0 }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'group flex items-center gap-3 rounded-xl p-4 transition-all duration-200',
        'shiori-surface-interactive cursor-pointer',
        task.completed && 'opacity-60'
      )}
      onClick={() => onToggle(task.id)}
    >
      <motion.div
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          task.completed ? 'bg-primary border-primary' : 'border-muted-foreground/40 group-hover:border-primary'
        )}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="text-primary-foreground h-3 w-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm font-medium transition-all duration-200',
            task.completed && 'text-muted-foreground line-through'
          )}
        >
          {task.title}
        </p>
        {task.dueTime && (
          <div className="mt-1 flex items-center gap-1">
            <Clock className="text-muted-foreground h-3 w-3" />
            <span className="text-muted-foreground text-xs">{task.dueTime}</span>
          </div>
        )}
      </div>
      {task.priority && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || task.priority === 'high' ? 1 : 0.5 }}
          className={cn('shrink-0', priorityColors[task.priority])}
        >
          <Flag className="h-4 w-4" />
        </motion.div>
      )}
    </motion.div>
  );
}
