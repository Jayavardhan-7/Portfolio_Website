import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  // useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;
