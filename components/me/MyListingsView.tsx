"use client";

import ListingCard from "@/components/listings/ListingCard";
import MyListingsEmpty from "@/components/me/MyListingsEmpty";
import type { Listing } from "@/lib/listings";

function getListingStatus(listing: Listing) {
  if (listing.is_sold) {
    return { label: "Verkauft", className: "bg-purple-100 text-purple-800" };
  }

  if (listing.is_reserved) {
    return { label: "Reserviert", className: "bg-blue-100 text-blue-800" };
  }

  if (listing.is_under_review) {
    return { label: "In Prüfung", className: "bg-amber-100 text-amber-800" };
  }

  if (listing.is_online) {
    return { label: "Online", className: "bg-green-100 text-green-800" };
  }

  return { label: "Offline", className: "bg-gray-100 text-gray-700" };
}

function ListingStatusBadge({ listing }: { listing: Listing }) {
  const status = getListingStatus(listing);

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
    >
      {status.label}
    </span>
  );
}

export default function MyListingsView({
  listings,
  count,
}: {
  listings: Listing[];
  count: number;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Meine Anzeigen</h1>
        <p className="mt-1 text-sm text-gray-500">
          {count} {count === 1 ? "Anzeige" : "Anzeigen"}
        </p>
      </div>

      {listings.length > 0 ? (
        <div className="mt-8 flex flex-col gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="flex flex-col gap-2">
              <ListingStatusBadge listing={listing} />
              <ListingCard
                listing={listing}
                isFavourite={false}
                variant="owner"
              />
            </div>
          ))}
        </div>
      ) : (
        <MyListingsEmpty />
      )}
    </div>
  );
}
