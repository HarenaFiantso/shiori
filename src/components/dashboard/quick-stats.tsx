import { ElementType } from 'react';

import { useTaskStats } from '@/hooks';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Flame, Target } from 'lucide-react';

interface StatCardProps {
  icon: ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  index: number;
}

function StatCard({ icon: Icon, label, value, suffix, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05 }}
      className="shiori-card p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-foreground text-2xl font-semibold">{value}</span>
            {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
          </div>
        </div>
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon className="text-primary h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

export function QuickStats() {
  const { stats, loading, error } = useTaskStats();

  if (loading) {
    return (
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="shiori-card h-23 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return <div className="text-muted-foreground mb-6 text-sm">Unable to load your stats.</div>;
  }

  const statItems = [
    {
      icon: CheckCircle2,
      label: 'Tasks Done',
      value: stats.completed_tasks,
      suffix: 'today',
    },
    {
      icon: FileText,
      label: 'Notes',
      value: 0,
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
