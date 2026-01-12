import { supabase } from '@/supabase/client';
import { useEffect, useState } from 'react';

interface UseTasksOptions {
  withProfiles?: boolean;
  filter?: {
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    dueDateFrom?: string;
    dueDateTo?: string;
  };
}

export function useTasks(options: UseTasksOptions = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { withProfiles = false, filter } = options;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      
      let query = withProfiles
        ? supabase.from('tasks_with_profiles').select('*')
        : supabase.from('tasks').select('*');

      if (filter?.completed !== undefined) {
        query = query.eq('completed', filter.completed);
      }
      if (filter?.priority) {
        query = query.eq('priority', filter.priority);
      }
      if (filter?.dueDateFrom) {
        query = query.gte('due_date', filter.dueDateFrom);
      }
      if (filter?.dueDateTo) {
        query = query.lte('due_date', filter.dueDateTo);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (taskData: Omit<TaskInsert, 'user_id'>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({ ...taskData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      setTasks((prev) => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add task';
      setError(message);
      return { data: null, error: message };
    }
  };

  // Update task
  const updateTask = async (id: string, updates: TaskUpdate) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      return { data: null, error: message };
    }
  };

  // Toggle task completion
  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    return updateTask(id, { completed: !task.completed });
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;
      setTasks((prev) => prev.filter((task) => task.id !== id));
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      return { error: message };
    }
  };

  // Subscribe to real-time changes
  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel('tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [payload.new as Task, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((task) => (task.id === payload.new.id ? (payload.new as Task) : task))
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((task) => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks,
  };
}