import { About, AnimatedBackground, Benefits, Features, Hero, Navigation } from '@/components/landing';

export default function Home() {
  return (
    <section className="min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <Benefits />
      <Features />
      <About />
    </section>
  );
}
