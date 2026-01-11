"use client"

import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks';
import { supabase } from '@/supabase/client';
import { motion } from 'motion/react';
import { toast } from 'sonner';

import { AvatarUpload } from './avatar-upload';

export function ProfileCard() {
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

      if (error && error.code !== 'PGRST116') {
        toast.error('Error loading profile', {
          description: error.message,
          position: 'top-center',
          style: {
            background: '#ef4444',
            color: 'white',
            border: 'none',
          },
          duration: 5000,
        });
        return;
      }

      if (data) {
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchProfile();
  }, [user, toast]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="shiori-card p-6">
      <div className="flex items-center gap-6">
        <AvatarUpload userId={user?.id || ''} avatarUrl={avatarUrl} onAvatarChange={setAvatarUrl} size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="text-foreground truncate text-xl font-semibold">{displayName || 'Set your name'}</h2>
          <p className="text-muted-foreground truncate">{user?.email}</p>
          {bio && <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{bio}</p>}
        </div>
      </div>
    </motion.div>
  );
}
