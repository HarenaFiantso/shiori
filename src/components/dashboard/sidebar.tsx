'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { supabase } from '@/supabase/client';
import {
  BarChart3,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';
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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const { user } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setAvatarUrl(null);
        setDisplayName(null);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('avatar_url, display_name')
        .eq('user_id', user.id)
        .single();

      console.log(data);

      if (data) {
        setAvatarUrl(data.avatar_url);
        setDisplayName(data.display_name);
      }
    };

    fetchProfile();
  }, [user]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
      <div className="border-sidebar-border space-y-1 border-t p-3">
        <motion.button
          onClick={() => router.push('/dashboard/profile')}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150',
            'shiori-surface-interactive'
          )}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-muted flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="text-muted-foreground h-3.5 w-3.5" />
            )}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-foreground overflow-hidden text-sm font-medium whitespace-nowrap"
              >
                {displayName || user?.email?.split('@')[0] || 'Profile'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <NavItem
          icon={Settings}
          label="Settings"
          collapsed={collapsed}
          onClick={() => router.push('/dashboard/settings')}
        />
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:bg-accent hover:text-white cursor-pointer flex w-full items-center justify-center rounded-lg p-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </motion.button>
      </div>
    </motion.aside>
  );
}
