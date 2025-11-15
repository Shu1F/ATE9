import { SectionContactForm } from "@/components/lp/SectionContactForm";
import { SectionHero } from "@/components/lp/SectionHero";
import { SectionMission } from "@/components/lp/SectionMission";
import { SectionPortfolio } from "@/components/lp/SectionPortfolio";
import { SectionServices } from "@/components/lp/SectionServices";
import { SiteFooter } from "@/components/lp/SiteFooter";
import { SiteHeader } from "@/components/lp/SiteHeader";
import { getLandingContent } from "@/services/cms/landing";

export default async function LPPage() {
  const content = await getLandingContent();

  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <SectionHero content={content.hero} />
        <SectionMission />
        <SectionServices content={content.services} />
        <SectionPortfolio content={content.portfolio} />
        <SectionContactForm />
      </main>
      <SiteFooter />
    </>
  );
}

