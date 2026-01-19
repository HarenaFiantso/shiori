import { useEffect, useState } from 'react';

import { supabase } from '@/supabase/client';
import { NoteStats, TaskStats } from '@/supabase/types';

export function useTaskStats() {
  const [taskStats, setTaskStats] = useState<TaskStats | null>(null);
  const [noteStats, setNoteStats] = useState<NoteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskStats = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase.rpc('get_user_task_stats', { target_user_id: user.id });

      if (error) throw error;
      setTaskStats(data[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchNoteStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_note_stats');

      if (error) throw error;
      setNoteStats(data[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskStats();
    fetchNoteStats();
  }, []);

  return {
    taskStats,
    noteStats,
    loading,
    error,
    refetch: fetchTaskStats,
  };
}
