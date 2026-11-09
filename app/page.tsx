import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeStudioSection from '@/components/ThreeStudioSection';
import PortfolioSection from '@/components/PortfolioSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-cyan-400 selection:text-slate-950">
      <Navbar />
      <Hero />
      <ThreeStudioSection />
      <PortfolioSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
