import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotes } from '@/hooks';
import { cn } from '@/lib/utils';
import type { Note, NoteColor } from '@/supabase/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Archive,
  ArrowRight,
  FileText,
  Loader2,
  MoreVertical,
  Palette,
  Pin,
  Plus,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (note: { title: string; content: string; color: NoteColor }) => Promise<void>;
}

const colors = [
  { value: 'default', label: 'Default', bg: 'bg-muted' },
  { value: 'blue', label: 'Blue', bg: 'bg-blue-500/20' },
  { value: 'green', label: 'Green', bg: 'bg-emerald-500/20' },
  { value: 'yellow', label: 'Yellow', bg: 'bg-amber-500/20' },
  { value: 'purple', label: 'Purple', bg: 'bg-purple-500/20' },
  { value: 'pink', label: 'Pink', bg: 'bg-pink-500/20' },
] as const;

function AddNoteModal({ open, onOpenChange, onAdd }: AddNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<NoteColor>('default');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        content: content.trim(),
        color,
      });

      setTitle('');
      setContent('');
      setColor('default');
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setTitle('');
    setContent('');
    setColor('default');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-border/50 bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <FileText className="text-primary h-4 w-4" />
            </div>
            New Note
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">Capture your thoughts and ideas</DialogDescription>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="noteTitle">Title *</Label>
            <Input
              id="noteTitle"
              placeholder="Give your note a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              autoFocus
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="noteContent">Content</Label>
            <Textarea
              id="noteContent"
              placeholder="Start writing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
              rows={6}
              className="resize-none"
              disabled={submitting}
            />
            <p className="text-muted-foreground text-right text-xs">{content.length}/5000</p>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color
            </Label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  disabled={submitting}
                  className={cn(
                    'h-8 w-8 rounded-full transition-all',
                    c.bg,
                    color === c.value
                      ? 'ring-primary ring-offset-background scale-110 ring-2 ring-offset-2'
                      : 'hover:scale-105',
                    submitting && 'cursor-not-allowed opacity-50'
                  )}
                  title={c.label}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Note'
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}

interface NoteCardProps {
  note: Note;
  index: number;
  onTogglePin: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

function NoteCard({ note, index, onTogglePin, onArchive, onDelete, onClick }: NoteCardProps) {
  const colorMap: Record<NoteColor, string> = {
    default: 'bg-muted',
    blue: 'bg-blue-500/10',
    green: 'bg-emerald-500/10',
    yellow: 'bg-amber-500/10',
    purple: 'bg-purple-500/10',
    pink: 'bg-pink-500/10',
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={cn('shiori-surface-interactive group relative cursor-pointer rounded-xl p-4', colorMap[note.color])}
    >
      <div className="flex items-start gap-3">
        <div onClick={() => onClick(note.id)} className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <FileText className="text-primary h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
                    {note.title}
                  </h3>
                  {note.is_pinned && <Pin className="text-primary fill-primary h-3 w-3 shrink-0" />}
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{note.content || 'No content'}</p>
                <p className="text-muted-foreground/70 mt-2 text-xs">{getTimeAgo(note.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(note.id);
              }}
            >
              <Pin className="mr-2 h-4 w-4" />
              {note.is_pinned ? 'Unpin' : 'Pin'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onArchive(note.id);
              }}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

export function NotesSection() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const router = useRouter();
  const { notes, loading, error, addNote, togglePin, toggleArchive, deleteNote } = useNotes({
    limit: 3,
  });

  const handleAddNote = async (newNote: { title: string; content: string; color: NoteColor }) => {
    const result = await addNote(newNote);

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
      toast.success('Note created', {
        description: 'Your new note has been saved.',
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

  const handleTogglePin = async (id: string) => {
    const result = await togglePin(id);
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

  const handleArchive = async (id: string) => {
    const result = await toggleArchive(id);
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
    } else {
      toast.info('Note archived', {
        description: 'Note has been moved to archive.',
        position: 'top-center',
        style: {
          background: '#209CEE',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteNote(id);
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
    } else {
      toast.success('Note deleted', {
        description: 'Your note has been permanently deleted.',
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

  const handleNoteClick = (id: string) => {
    router.push(`/dashboard/notes/${id}`);
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="shiori-card p-6"
      >
        <div className="py-8 text-center">
          <AlertCircle className="text-destructive mx-auto mb-2 h-12 w-12" />
          <p className="text-destructive mb-2 font-medium">Error loading notes</p>
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
        transition={{ delay: 0.2 }}
        className="shiori-card p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-semibold">Recent Notes</h2>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {loading ? 'Loading...' : `Quick access to your thoughts`}
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
            New Note
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <div className="py-8 text-center">
            <FileText className="text-muted-foreground/50 mx-auto mb-3 h-12 w-12" />
            <p className="text-muted-foreground">No notes yet. Start capturing your ideas!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {notes.map((note, index) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  index={index}
                  onTogglePin={handleTogglePin}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                  onClick={handleNoteClick}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
        <motion.button
          className="text-primary group mt-6 flex items-center gap-1 text-sm"
          whileHover={{ x: 4 }}
          onClick={() => router.push('/notes')}
        >
          Browse all notes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
      <AddNoteModal open={addModalOpen} onOpenChange={setAddModalOpen} onAdd={handleAddNote} />
    </>
  );
}
