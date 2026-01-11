'use client';

import { useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';
import { motion } from 'motion/react';

import { SettingsItem } from './setting-item';
import { SettingsSection } from './setting-section';

export function Notifications() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <SettingsSection title="Notifications" description="Configure your notification preferences" icon={Bell}>
        <div className="space-y-3">
          <SettingsItem label="Email Notifications" description="Receive updates via email">
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </SettingsItem>
          <SettingsItem label="Push Notifications" description="Receive push notifications">
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </SettingsItem>
        </div>
      </SettingsSection>
    </motion.div>
  );
}
