import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { CTA } from "@/components/sections/CTA";
import { WorldMapSection } from "@/components/sections/WorldMapSection";
import { Footerdemo } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <CTA />
        <WorldMapSection />
      </div>
      <Footerdemo />
    </main>
  );
}
