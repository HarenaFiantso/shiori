import { ReactNode } from 'react';

import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function SettingsSection({ title, description, icon: Icon, children }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Icon className="text-primary h-5 w-5" />
          </div>
        )}
        <div>
          <h3 className="text-foreground text-base font-semibold">{title}</h3>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      </div>
      <div className="pl-0">{children}</div>
    </div>
  );
}
