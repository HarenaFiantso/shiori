import { useTaskStats } from '@/hooks';
import { CheckCircle2, FileText, Flame, Target } from 'lucide-react';

import { StatCard } from './stat-card';

export function QuickStats() {
  const { taskStats, noteStats, loading, error } = useTaskStats();

  if (loading) {
    return (
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="shiori-card h-23 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || !taskStats || !noteStats) {
    return <div className="text-muted-foreground mb-6 text-sm">Unable to load your stats.</div>;
  }

  const statItems = [
    {
      icon: CheckCircle2,
      label: 'Tasks Done',
      value: taskStats.completed_tasks,
      suffix: 'today',
    },
    {
      icon: FileText,
      label: 'Notes',
      value: noteStats.total_notes,
      suffix: 'total',
    },
    {
      icon: Flame,
      label: 'Best Streak',
      value: 0,
      suffix: 'days',
    },
    {
      icon: Target,
      label: 'Focus Time',
      value: 0,
      suffix: 'hrs',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statItems.map((stat, index) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          index={index}
        />
      ))}
    </div>
  );
}
