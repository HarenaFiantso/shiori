'use client';

import { useState } from 'react';

import { HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { SettingsItem } from './setting-item';
import { SettingsSection } from './setting-section';

export function Support() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <SettingsSection title="Support" description="Get help and learn more" icon={HelpCircle}>
        <div className="space-y-3">
          <SettingsItem label="Help Center" description="Browse FAQs and guides" onClick={() => setHelpOpen(true)} />
          <SettingsItem
            label="Contact Support"
            description="Get in touch with our team"
            onClick={() => {
              toast.info('Contact Support', {
                description: 'Email us at harenafiantso@gmail.com',
                position: 'top-center',
                style: {
                  background: '#209CEE',
                  color: 'white',
                  border: 'none',
                },
                duration: 5000,
              });
            }}
          />
        </div>
      </SettingsSection>
    </motion.div>
  );
}
