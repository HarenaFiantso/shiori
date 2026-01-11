'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks';

export default function Profile() {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      redirect('/dashboard/settings');
    }
  }, [loading]);

  return null;
}
