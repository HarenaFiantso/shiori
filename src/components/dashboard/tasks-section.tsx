import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { useTasks } from '@/hooks/use-tasks';
import { ArrowRight, Loader2, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';

import { AddTaskModal } from './add-task-modal';
import { TaskCard } from './task-card';

export function TasksSection() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const router = useRouter();
  const { tasks, loading, error, addTask, toggleTask } = useTasks();

  const handleToggle = async (id: string) => {
    const result = await toggleTask(id);
    if (result?.error) {
      toast.error('Error', {
        description: result.error,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    }
  };

  const handleAddTask = async (newTask: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    due_date: string;
    due_time: string;
  }) => {
    const result = await addTask({
      title: newTask.title,
      description: newTask.description || null,
      priority: newTask.priority,
      due_date: newTask.due_date || null,
      due_time: newTask.due_time || null,
    });

    if (result.error) {
      toast.error('Error', {
        description: result.error,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    } else {
      toast.success('Success', {
        description: 'Task added successfully',
        position: 'top-center',
        style: {
          background: '#22c55d',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    }
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="shiori-card p-6">
        <div className="py-8 text-center">
          <p className="text-destructive mb-2">Error loading tasks</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="shiori-card p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">Today's Tasks</h2>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  {completedTasks.length} of {tasks.length} completed
                </>
              )}
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/10"
            onClick={() => setAddModalOpen(true)}
            disabled={loading}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="mb-6">
          <div className="bg-muted h-1.5 overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
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
                  onToggle={handleToggle}
                  index={index}
                />
              ))}
            </AnimatePresence>
            {completedTasks.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">Completed</p>
                <AnimatePresence mode="popLayout">
                  {completedTasks.map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={{
                        id: task.id,
                        title: task.title,
                        completed: task.completed,
                        priority: task.priority,
                        dueTime: task.due_time || undefined,
                      }}
                      onToggle={handleToggle}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}

        <motion.button
          className="text-primary group mt-6 flex items-center gap-1 text-sm"
          whileHover={{ x: 4 }}
          onClick={() => router.push('/tasks')}
        >
          View all tasks
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
      <AddTaskModal open={addModalOpen} onOpenChange={setAddModalOpen} onAdd={handleAddTask} />
    </>
  );
}
