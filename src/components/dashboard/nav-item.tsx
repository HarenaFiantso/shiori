import { ElementType } from 'react';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

interface NavItemProps {
  icon: ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, active, collapsed, onClick }: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150',
        'shiori-surface-interactive',
        active && 'bg-primary/10 text-primary'
      )}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Icon className={cn('h-5 w-5 shrink-0', active ? 'text-primary' : 'text-muted-foreground')} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className={cn(
              'overflow-hidden text-sm font-medium whitespace-nowrap',
              active ? 'text-primary' : 'text-foreground'
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
