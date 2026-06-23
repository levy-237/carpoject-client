"use client";

import ListingCard from "@/components/listings/ListingCard";
import FavouriteListingsEmpty from "@/components/me/FavouriteListingsEmpty";
import type { Listing } from "@/lib/listings";

export default function FavouriteListingsView({
  listings,
  count,
}: {
  listings: Listing[];
  count: number;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Favoriten</h1>
        <p className="mt-1 text-sm text-gray-500">
          {count}{" "}
          {count === 1 ? "gespeicherte Anzeige" : "gespeicherte Anzeigen"}
        </p>
      </div>

      {listings.length > 0 ? (
        <div className="mt-8 flex flex-col gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavourite={true}
            />
          ))}
        </div>
      ) : (
        <FavouriteListingsEmpty />
      )}
    </div>
  );
}
