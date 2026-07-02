import LandingSearchBar from "@/components/filters/LandingSearchBar";
import BeliebteKategorien from "@/components/landing/BeliebteKategorien";
import LandingFaq from "@/components/landing/LandingFaq";
import TopDeals from "@/components/landing/TopDeals";
import { createPageMetadata, SITE_NAME } from "@/lib/metadata";

export const metadata = createPageMetadata(SITE_NAME);

export default function Home() {
  return (
    <main className="flex flex-1 flex-col" data-testid="landing-page">
      <LandingSearchBar />
      <BeliebteKategorien />
      <TopDeals />
      <LandingFaq />
    </main>
  );
}
