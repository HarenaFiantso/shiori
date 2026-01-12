import { useState } from 'react';

import { Button, Input, Label } from '@/components/ui';
import { supabase } from '@/supabase/client';
import { toast } from 'sonner';

import { SettingsModal } from './setting-modal';

interface ChangePasswordModal {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModal) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.info("Passwords don't match", {
        description: 'Please make sure your passwords match.',
        position: 'top-center',
        style: {
          background: '#209CEE',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      return;
    }

    if (newPassword.length < 6) {
      toast.info('Passwords too short', {
        description: 'Password must be at least 6 characters.',
        position: 'top-center',
        style: {
          background: '#209CEE',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error('Error changing password', {
        description: error.message,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    } else {
      toast.success('Password changed', {
        description: 'Your password has been updated successfully.',
        position: 'top-center',
        style: {
          background: '#22c55d',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      setNewPassword('');
      setConfirmPassword('');
    }

    setIsSaving(false);
  };

  return (
    <SettingsModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Password"
      description="Enter a new password for your account"
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleChangePassword} disabled={isSaving}>
            {isSaving ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </div>
    </SettingsModal>
  );
}
