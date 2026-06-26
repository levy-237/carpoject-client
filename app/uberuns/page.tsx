import UberUnsAudience from "@/components/uberuns/UberUnsAudience";
import UberUnsFeatures from "@/components/uberuns/UberUnsFeatures";
import UberUnsIdea from "@/components/uberuns/UberUnsIdea";
import UberUnsIntro from "@/components/uberuns/UberUnsIntro";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Über uns",
  "Marktplatz für Elektroautos mit Fokus auf Suche, Vergleichbarkeit und klare Fahrzeugdaten.",
);

export default function UberUnsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <UberUnsIntro />
      <UberUnsIdea />
      <UberUnsAudience />
      <UberUnsFeatures />
    </main>
  );
}
