import UnderMaintenance from "@/components/ui/UnderMaintenance";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Unternehmen",
  "Der Unternehmensbereich wird gerade vorbereitet.",
);

export default function UnternehmenDetailPage() {
  return (
    <main className="flex flex-1 flex-col">
      <UnderMaintenance
        title="Diese Unternehmensseite ist bald verfügbar"
        description="Dieser Bereich ist noch in Arbeit. Wir zeigen dir hier bald mehr Informationen."
      />
    </main>
  );
}
