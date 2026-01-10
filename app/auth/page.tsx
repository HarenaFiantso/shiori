import { AuthCard, Branding } from '@/components/auth';

export default function Auth() {
  return (
    <section className="bg-background flex min-h-screen">
      <Branding />
      <AuthCard />
    </section>
  );
}
