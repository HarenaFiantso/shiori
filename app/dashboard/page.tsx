'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const { signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth');
  };

  return (
    <div className='w-full h-screen flex items-center justify-center space-y-5'>
      <h1>Dashboard</h1>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="text-muted-foreground hover:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
