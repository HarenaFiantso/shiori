import { AnimatedBackground, Benefits, Hero, Navigation } from '@/components/landing';

export default function Home() {
  return (
    <section className="min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <Benefits />
    </section>
  );
}
