import { Task } from '@/supabase/types';
import { AnimatePresence, motion } from 'motion/react';

import { TaskCard } from './task-card';

interface TasksListProps {
  incompleteTasks: Task[];
  completedTasks: Task[];
  onToggle: (id: string) => void;
}

function CompletedTasksSection({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
      <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">Completed</p>
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={{
              id: task.id,
              title: task.title,
              completed: task.completed,
              priority: task.priority,
              dueTime: task.due_time || undefined,
            }}
            onToggle={onToggle}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function TasksList({ incompleteTasks, completedTasks, onToggle }: TasksListProps) {
  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {incompleteTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={{
              id: task.id,
              title: task.title,
              completed: task.completed,
              priority: task.priority,
              dueTime: task.due_time || undefined,
            }}
            onToggle={onToggle}
            index={index}
          />
        ))}
      </AnimatePresence>
      {completedTasks.length > 0 && <CompletedTasksSection tasks={completedTasks} onToggle={onToggle} />}
    </div>
  );
}
