import { Hero } from "@/components/sections/hero";
import { LogoCarousel } from "@/components/sections/logo-carousel";
import { Stats } from "@/components/sections/stats";
import { ImpactAreas } from "@/components/sections/impact-areas";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyUs } from "@/components/sections/why-us";
import { SelectedWork } from "@/components/sections/selected-work";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <Stats />
      <ImpactAreas />
      <Services />
      <HowItWorks />
      <WhyUs />
      <SelectedWork />
      <InvestmentSection />
      <Footer />
    </>
  );
}
