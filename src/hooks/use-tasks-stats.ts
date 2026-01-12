import { useEffect, useState } from 'react';

import { supabase } from '@/supabase/client';
import { TaskStats } from '@/supabase/types';

export function useTaskStats() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .rpc('get_user_task_stats', { target_user_id: user.id });

      if (error) throw error;
      setStats(data[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}
