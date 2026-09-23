import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AuthorityStrip } from "@/components/sections/AuthorityStrip";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { APACMap } from "@/components/sections/APACMap";
import { WhyAlpha } from "@/components/sections/WhyAlpha";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AuthorityStrip />
        <JourneySection />
        <IndustriesSection />
        <CaseStudiesSection />
        <APACMap />
        <WhyAlpha />
        <LeadershipSection />
        <TestimonialsSection />
        <InsightsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
