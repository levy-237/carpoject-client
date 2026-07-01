import type { Listing } from "@/types/listings";

export default function ListingDetailDescription({
  listing,
}: {
  listing: Listing;
}) {
  if (!listing.description) {
    return null;
  }

  return (
    <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
        Beschreibung
      </h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">
        {listing.description}
      </p>
    </section>
  );
}
