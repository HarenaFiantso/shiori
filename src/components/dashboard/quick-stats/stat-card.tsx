import { ElementType } from 'react';

import { motion } from 'motion/react';

interface StatCardProps {
  icon: ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  index: number;
}

export function StatCard({ icon: Icon, label, value, suffix, index }: StatCardProps) {
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
