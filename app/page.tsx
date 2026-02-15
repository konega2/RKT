import Hero from "@/components/Hero";
import CompetitionTimeline from "@/components/timeline/CompetitionTimeline";
import ProductionSection from "@/components/production/ProductionSection";
import ManifestSection from "@/components/manifest/ManifestSection";
import PricingSection from "@/components/pricing/PricingSection";
import PreRegistrationSection from "@/components/preregistration/PreRegistrationSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CompetitionTimeline />
      <ProductionSection />
      <ManifestSection />
      <PricingSection />
      <PreRegistrationSection />
    </>
  );
}