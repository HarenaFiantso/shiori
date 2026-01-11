import { useState } from 'react';

import { Button, Input, Label, Textarea } from '@/components/ui';
import { useAuth } from '@/hooks';
import { supabase } from '@/supabase/client';
import { toast } from 'sonner';

import { SettingsModal } from './setting-modal';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileModal({ open, onOpenChange }: EditProfileModalProps) {
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuth();

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: displayName.trim(),
        bio: bio.trim(),
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Error saving profile', {
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
      toast.success('Profile saved', {
        description: 'Your changes have been saved successfully.',
        position: 'top-center',
        style: {
          background: '#22c55d',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      window.location.reload();
      onOpenChange(false);
    }

    setIsSaving(false);
  };

  return (
    <SettingsModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Update your personal information"
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            placeholder="Your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={50}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
            rows={3}
            className="resize-none"
          />
          <p className="text-muted-foreground text-right text-xs">{bio.length}/200</p>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </SettingsModal>
  );
}
