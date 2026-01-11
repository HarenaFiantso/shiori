'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { FullPageLoader } from '@/components/loader';
import { useAuth } from '@/hooks';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      console.log('No session, redirecting to login');
      router.push('/auth');
    }
  }, [session, loading, router]);

  if (loading) return <FullPageLoader />;

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
