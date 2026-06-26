import ListingForm from "@/components/add-listings/ListingForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Anzeige erstellen");

export default function AddListingsPage() {
  return (
    <main className="flex flex-1 justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-4xl">
        <ListingForm variant="create" />
      </div>
    </main>
  );
}
