import LandingSearchBar from "@/components/filters/LandingSearchBar";
import BeliebteKategorien from "@/components/landing/BeliebteKategorien";
import LandingFaq from "@/components/landing/LandingFaq";
import TopDeals from "@/components/landing/TopDeals";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingSearchBar />
      <BeliebteKategorien />
      <TopDeals />
      <LandingFaq />
    </main>
  );
}
