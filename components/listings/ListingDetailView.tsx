import Link from "next/link";
import ListingImageGallery from "@/components/listings/ListingImageGallery";
import type { Listing } from "@/types/listings";
import ListingDetailDescription from "./detail/ListingDetailDescription";
import ListingDetailInfoGrid from "./detail/ListingDetailInfoGrid";
import ListingDetailSummary from "./detail/ListingDetailSummary";

export default function ListingDetailView({
  listing,
  isFavourite,
}: {
  listing: Listing;
  isFavourite: boolean;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:py-14">
      <Link
        href="/listings"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Zurück zu den Anzeigen
      </Link>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.75fr)]">
        <div className="flex flex-col gap-5 lg:sticky lg:top-6">
          <ListingImageGallery listing={listing} />
        </div>
        <ListingDetailSummary listing={listing} isFavourite={isFavourite} />
      </div>

      <ListingDetailDescription listing={listing} />
      <ListingDetailInfoGrid listing={listing} />
      {/* <ListingPriceHistory listing={listing} /> */}
    </main>
  );
}
