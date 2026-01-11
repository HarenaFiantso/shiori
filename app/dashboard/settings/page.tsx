import { Header, ProfileCard } from '@/components/dashboard';

export default function Settings() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <ProfileCard />
      </main>
    </div>
  );
}
