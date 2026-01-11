'use client';

import { useState } from 'react';

import { redirect } from 'next/navigation';

import {
  Account,
  Appearance,
  ConfirmModal,
  DangerZone,
  Header,
  Notifications,
  ProfileCard,
  Support,
} from '@/components/dashboard';
import { useAuth } from '@/hooks';

export default function Settings() {
  const [signOutConfirmOpen, setSignOutConfirmOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    redirect('/auth');
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <ProfileCard />
        <Account />
        <Appearance />
        <Notifications />
        <Support />
        <DangerZone setSignOutConfirmOpen={setSignOutConfirmOpen} setDeleteAccountOpen={setDeleteAccountOpen} />
      </main>
      <ConfirmModal
        open={signOutConfirmOpen}
        onOpenChange={setSignOutConfirmOpen}
        title="Sign Out"
        description="Are you sure you want to sign out of your account?"
        confirmLabel="Sign Out"
        onConfirm={handleSignOut}
      />
    </div>
  );
}
