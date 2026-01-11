'use client';

import { useState } from 'react';

import { Switch } from '@/components/ui';
import { Palette } from 'lucide-react';
import { motion } from 'motion/react';

import { SettingsItem } from './setting-item';
import { SettingsSection } from './setting-section';

export function Appearance() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <SettingsSection title="Appearance" description="Customize how Shiori looks" icon={Palette}>
        <div className="space-y-3">
          <SettingsItem label="Dark Mode" description="Switch between light and dark themes">
            <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />
          </SettingsItem>
        </div>
      </SettingsSection>
    </motion.div>
  );
}
