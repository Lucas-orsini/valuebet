import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBanner } from "@/components/ui/StatsBanner";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <HeroSection />
      <StatsBanner />
      <FeaturesSection />
      <HowItWorksSection />
      <ResultsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
