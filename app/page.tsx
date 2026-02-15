import Hero from "@/components/Hero";
import CompetitionTimeline from "@/components/timeline/CompetitionTimeline";
import ProductionSection from "@/components/production/ProductionSection";
import OfficialPrizesSection from "@/components/prizes/OfficialPrizesSection";
import ManifestSection from "@/components/manifest/ManifestSection";
import PricingSection from "@/components/pricing/PricingSection";
import FinalCallSection from "@/components/emotional/FinalCallSection";
import PreRegistrationSection from "@/components/preregistration/PreRegistrationSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CompetitionTimeline />
      <ProductionSection />
      <OfficialPrizesSection />
      <ManifestSection />
      <PricingSection />
      <FinalCallSection />
      <PreRegistrationSection />
    </>
  );
}