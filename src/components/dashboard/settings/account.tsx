'use client';

import { useState } from 'react';

import { useAuth } from '@/hooks';
import { User } from 'lucide-react';
import { motion } from 'motion/react';

import { SettingsItem } from './setting-item';
import { SettingsSection } from './setting-section';

export function Account({ setChangePasswordOpen }: { setChangePasswordOpen: (open: boolean) => void }) {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <SettingsSection title="Account" description="Manage your account settings" icon={User}>
        <div className="space-y-3">
          <SettingsItem label="Email Address" value={user?.email || ''} description="Your account email" />
          <SettingsItem
            label="Change Password"
            description="Update your password"
            onClick={() => setChangePasswordOpen(true)}
          />
        </div>
      </SettingsSection>
    </motion.div>
  );
}
