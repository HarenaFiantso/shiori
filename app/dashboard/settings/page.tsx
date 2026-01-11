import { Account, Appearance, Header, Notifications, ProfileCard, Support } from '@/components/dashboard';

export default function Settings() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <ProfileCard />
        <Account />
        <Appearance />
        <Notifications />
        <Support />
      </main>
    </div>
  );
}
