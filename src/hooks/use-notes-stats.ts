import { useEffect, useState } from 'react';

import { supabase } from '@/supabase/client';
import { NoteStats } from '@/supabase/types';

export function useNoteStats() {
  const [stats, setStats] = useState<NoteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_note_stats');

      if (error) throw error;
      setStats(data[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
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
