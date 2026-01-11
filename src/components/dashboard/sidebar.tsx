'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { BarChart3, CheckSquare, FileText, Home, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { NavItem } from './nav-item';

type NavItemConfig = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
};

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
  { id: 'notes', label: 'Notes', icon: FileText, href: '/dashboard/notes' },
  { id: 'habits', label: 'Habits', icon: Sparkles, href: '/dashboard/habits' },
  { id: 'insights', label: 'Insights', icon: BarChart3, href: '/dashboard/insights' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-sidebar border-sidebar-border flex h-screen flex-col border-r"
    >
      <div className="flex items-center justify-between p-4">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-sm font-bold">栞</span>
              </div>
              <span className="text-foreground text-lg font-semibold">Shiori</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="bg-primary mx-auto flex h-8 w-8 items-center justify-center rounded-lg">
            <span className="text-primary-foreground text-sm font-bold">栞</span>
          </div>
        )}
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ id, icon, label, href }) => (
          <NavItem
            key={id}
            icon={icon}
            label={label}
            collapsed={collapsed}
            active={isActive(href)}
            onClick={() => router.push(href)}
          />
        ))}
      </nav>
    </motion.aside>
  );
}
