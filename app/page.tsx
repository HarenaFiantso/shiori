import { About, AnimatedBackground, Benefits, CTA, Features, Footer, Hero, Navigation } from '@/components/landing';

export default function Home() {
  return (
    <section className="min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <Benefits />
      <Features />
      <About />
      <CTA />
      <Footer />
    </section>
  );
}
