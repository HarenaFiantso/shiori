'use client';

import { useRef, useState } from 'react';

import { supabase } from '@/supabase/client';
import { Camera, User } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AvatarUploadProps {
  userId: string;
  avatarUrl: string | null;
  onAvatarChange: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const iconSizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const buttonSizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export function AvatarUpload({ userId, avatarUrl, onAvatarChange, size = 'md' }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (!file.type.startsWith('image/')) {
      toast.info('Invalid file type', {
        description: 'Please upload an image file.',
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

    if (file.size > 5 * 1024 * 1024) {
      toast.info('File too large', {
        description: 'Please upload an image smaller than 5MB.',
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

    setIsUploading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Upload failed', {
        description: uploadError.message,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      setIsUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath);

    const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: urlWithTimestamp })
      .eq('user_id', userId);

    if (updateError) {
      toast.error('Error updating profile', {
        description: updateError.message,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    } else {
      onAvatarChange(urlWithTimestamp);
      toast.success('Avatar updated', {
        description: 'Your profile picture has been updated.',
        position: 'top-center',
        style: {
          background: '#22c55d',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
    }

    setIsUploading(false);
  };

  return (
    <div className="group relative">
      <div
        className={`${sizeClasses[size]} bg-muted ring-background flex items-center justify-center overflow-hidden rounded-full shadow-lg ring-4`}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <User className={`${iconSizes[size]} text-muted-foreground`} />
        )}
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`absolute right-0 bottom-0 ${buttonSizes[size]} bg-primary text-primary-foreground hover:bg-primary/90 ring-background flex items-center justify-center rounded-full shadow-lg ring-2 transition-all disabled:opacity-50`}
      >
        {isUploading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 rounded-full border-2"
          />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
    </div>
  );
}
