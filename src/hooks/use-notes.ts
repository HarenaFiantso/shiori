import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/supabase/client';
import type { Note, NoteWithMetadata } from '@/supabase/types';

interface UseNotesOptions {
  limit?: number;
  withMetadata?: boolean;
  includeArchived?: boolean;
  pinnedOnly?: boolean;
}

export function useNotes(options: UseNotesOptions = {}) {
  const { limit, withMetadata = false, includeArchived = false, pinnedOnly = false } = options;

  const [notes, setNotes] = useState<Note[] | NoteWithMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);

      if (withMetadata) {
        let query = supabase.from('notes_with_metadata').select('*');

        if (!includeArchived) {
          query = query.eq('is_archived', false);
        }
        if (pinnedOnly) {
          query = query.eq('is_pinned', true);
        }

        query = query.order('is_pinned', { ascending: false });
        query = query.order('updated_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        setNotes(data || []);
      } else {
        let query = supabase.from('notes').select('*');

        if (!includeArchived) {
          query = query.eq('is_archived', false);
        }
        if (pinnedOnly) {
          query = query.eq('is_pinned', true);
        }

        query = query.order('is_pinned', { ascending: false });
        query = query.order('updated_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        setNotes(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [limit, withMetadata, includeArchived, pinnedOnly]);

  const addNote = async (noteData: { title: string; content?: string; color?: string; is_pinned?: boolean }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('notes')
        .insert({
          user_id: user.id,
          title: noteData.title,
          content: noteData.content || null,
          color: (noteData.color as any) || 'default',
          is_pinned: noteData.is_pinned || false,
          is_archived: false,
        })
        .select()
        .single();

      if (error) throw error;
      setNotes((prev) => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add note';
      setError(message);
      return { data: null, error: message };
    }
  };

  const updateNote = async (
    id: string,
    updates: {
      title?: string;
      content?: string;
      color?: string;
      is_pinned?: boolean;
      is_archived?: boolean;
    }
  ) => {
    try {
      const { data, error } = await supabase.from('notes').update(updates).eq('id', id).select().single();

      if (error) throw error;
      setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, ...data } : note)));
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update note';
      setError(message);
      return { data: null, error: message };
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);

      if (error) throw error;
      setNotes((prev) => prev.filter((note) => note.id !== id));
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete note';
      setError(message);
      return { error: message };
    }
  };

  const togglePin = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    return updateNote(id, { is_pinned: !note.is_pinned });
  };

  // Toggle archive
  const toggleArchive = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    return updateNote(id, { is_archived: !note.is_archived });
  };

  const searchNotes = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('search_notes', {
        search_query: query,
      });

      if (error) throw error;
      setNotes(data || []);
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();

    const channel = supabase
      .channel('notes_changes')
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table: 'notes',
        },
        (payload: { eventType: string; new: Note; old: Note }) => {
          if (payload.eventType === 'INSERT') {
            const newNote = payload.new;
            if (includeArchived || !newNote.is_archived) {
              setNotes((prev) => [newNote, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedNote = payload.new;
            setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? { ...note, ...updatedNote } : note)));
          } else if (payload.eventType === 'DELETE') {
            setNotes((prev) => prev.filter((note) => note.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [includeArchived]);

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    searchNotes,
    refetch: fetchNotes,
  };
}
