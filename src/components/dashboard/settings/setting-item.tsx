import { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';

interface SettingsItemProps {
  label: string;
  description?: string;
  value?: string;
  onClick?: () => void;
  children?: ReactNode;
  danger?: boolean;
}

export function SettingsItem({ label, description, value, onClick, children, danger = false }: SettingsItemProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={`group border-border/50 flex items-center justify-between rounded-xl border p-4 ${isClickable ? 'shiori-surface-interactive cursor-pointer' : 'bg-card'} ${danger ? 'hover:border-destructive/30' : 'hover:border-primary/20'} transition-all duration-200`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="min-w-0 flex-1">
        <p className={`font-medium ${danger ? 'text-destructive' : 'text-foreground'}`}>{label}</p>
        {description && <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>}
      </div>
      {children ? (
        <div className="ml-4 shrink-0">{children}</div>
      ) : value ? (
        <div className="ml-4 flex shrink-0 items-center gap-2">
          <span className="text-muted-foreground text-sm">{value}</span>
          {isClickable && (
            <ChevronRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
          )}
        </div>
      ) : isClickable ? (
        <ChevronRight className="text-muted-foreground group-hover:text-foreground ml-4 h-4 w-4 shrink-0 transition-colors" />
      ) : null}
    </div>
  );
}
