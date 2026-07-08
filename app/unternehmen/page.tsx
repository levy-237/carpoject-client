import UnderMaintenance from "@/components/ui/UnderMaintenance";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Unternehmen",
  "Der Unternehmensbereich wird gerade vorbereitet.",
);

export default function UnternehmenPage() {
  return (
    <main className="flex flex-1 flex-col">
      <UnderMaintenance
        title="Unternehmen ist bald verfügbar"
        description="Wir bereiten Angebote und Informationen für Unternehmen vor. Bis dahin kannst du weiter Fahrzeuge entdecken."
      />
    </main>
  );
}
