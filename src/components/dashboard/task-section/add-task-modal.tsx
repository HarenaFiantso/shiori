import { useState } from 'react';

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
import { cn } from '@/lib/utils';
import { Calendar, Clock, Flag, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    due_date: string;
    due_time: string;
  }) => Promise<void>;
}

const priorities = [
  { value: 'low', label: 'Low', color: 'text-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-destructive' },
];

export const AddTaskModal = ({ open, onOpenChange, onAdd }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: dueDate || '',
        due_time: dueTime || '',
      });

      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setDueTime('');
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setDueTime('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-border/50 bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Task</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new task to track your progress
          </DialogDescription>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              autoFocus
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value as 'low' | 'medium' | 'high')}
                  disabled={submitting}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 transition-all',
                    priority === p.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50',
                    submitting && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <Flag className={cn('h-4 w-4', p.color)} />
                  <span className="text-sm font-medium">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10"
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime">Due Time</Label>
              <div className="relative">
                <Clock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="dueTime"
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="pl-10"
                  disabled={submitting}
                />
              </div>
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
                  Adding...
                </>
              ) : (
                'Add Task'
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
