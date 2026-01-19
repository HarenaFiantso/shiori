import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { showToast } from '@/components/utils';
import { useTasks } from '@/hooks/use-tasks';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

import { AddTaskModal } from './add-task-modal';
import { ProgressBar } from './progress-bar';
import { TaskHeader } from './task-header';
import { TasksList } from './task-list';

interface NewTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  due_time: string;
}

export function TaskSection() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const router = useRouter();

  const { tasks, loading, error, addTask, toggleTask } = useTasks();

  const { incompleteTasks, completedTasks, completionRate } = useMemo(() => {
    const incomplete = tasks.filter((t) => !t.completed);
    const complete = tasks.filter((t) => t.completed);
    const rate = tasks.length > 0 ? Math.round((complete.length / tasks.length) * 100) : 0;

    return {
      incompleteTasks: incomplete,
      completedTasks: complete,
      completionRate: rate,
    };
  }, [tasks]);

  const handleToggle = async (id: string) => {
    const result = await toggleTask(id);
    if (result?.error) {
      showToast.error(result.error);
    }
  };

  const handleAddTask = async (newTask: NewTask) => {
    const result = await addTask({
      title: newTask.title,
      description: newTask.description || null,
      priority: newTask.priority,
      due_date: newTask.due_date || null,
      due_time: newTask.due_time || null,
    });

    if (result.error) {
      showToast.error(result.error);
    } else {
      showToast.success('Task added successfully');
    }
  };

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
        <TaskHeader
          completedCount={completedTasks.length}
          totalCount={tasks.length}
          loading={loading}
          onAddClick={() => setAddModalOpen(true)}
        />
        <ProgressBar completionRate={completionRate} />
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
          <TasksList incompleteTasks={incompleteTasks} completedTasks={completedTasks} onToggle={handleToggle} />
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
