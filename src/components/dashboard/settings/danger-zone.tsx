import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

import { SettingsItem } from './setting-item';
import { SettingsSection } from './setting-section';

interface DangerZoneProps {
  setSignOutConfirmOpen: (open: boolean) => void;
  setDeleteAccountOpen: (open: boolean) => void;
}

export function DangerZone({ setSignOutConfirmOpen, setDeleteAccountOpen }: DangerZoneProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <SettingsSection title="Danger Zone" description="Irreversible actions" icon={Shield}>
        <div className="space-y-3">
          <SettingsItem
            label="Sign Out"
            description="Sign out of your account"
            onClick={() => setSignOutConfirmOpen(true)}
            danger
          />
          <SettingsItem
            label="Delete Account"
            description="Permanently delete your account and data"
            onClick={() => setDeleteAccountOpen(true)}
            danger
          />
        </div>
      </SettingsSection>
    </motion.div>
  );
}
