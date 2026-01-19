import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

interface TaskHeaderProps {
  completedCount: number;
  totalCount: number;
  loading: boolean;
  onAddClick: () => void;
}

export function TaskHeader({ completedCount, totalCount, loading, onAddClick }: TaskHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-foreground text-lg font-semibold">Today's Tasks</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">
          {loading ? 'Loading...' : `${completedCount} of ${totalCount} completed`}
        </p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-primary hover:text-primary hover:bg-primary/10"
        onClick={onAddClick}
        disabled={loading}
      >
        <Plus className="mr-1 h-4 w-4" />
        Add Task
      </Button>
    </div>
  );
}
