import AufladenChecklist from "@/components/aufladen/AufladenChecklist";
import AufladenCosts from "@/components/aufladen/AufladenCosts";
import AufladenIntro from "@/components/aufladen/AufladenIntro";
import AufladenMethods from "@/components/aufladen/AufladenMethods";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Aufladen",
  "Alles Wichtige zum Laden von Elektroautos: zuhause, öffentlich, Schnellladen, Kosten und Kaufberatung.",
);

export default function AufladenPage() {
  return (
    <main className="flex flex-1 flex-col" data-testid="aufladen-page">
      <AufladenIntro />
      <AufladenMethods />
      <AufladenCosts />
      <AufladenChecklist />
    </main>
  );
}
