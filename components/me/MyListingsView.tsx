"use client";

import { Pencil, Trash2 } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { getListingStatus } from "@/components/listings/listingDisplay";
import MyListingsEmpty from "@/components/me/MyListingsEmpty";
import type { Listing } from "@/types/listings";
import Link from "next/link";

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

function EditListingButton({ listingId }: { listingId: number }) {
  return (
    <Link
      href={`/me/listings/${listingId}`}
      className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <Pencil
        className="size-4 shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      Bearbeiten
    </Link>
  );
}

function DeleteListingButton({ listingId }: { listingId: number }) {
  return (
    <button
      type="button"
      data-listing-id={listingId}
      className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors duration-200 hover:border-red-300 hover:bg-red-100"
    >
      <Trash2
        className="size-4 shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      Löschen
    </button>
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
              <div className="flex items-start gap-2 w-full">
                <ListingCard
                  listing={listing}
                  isFavourite={false}
                  variant="owner"
                  handleAddToCompare={() => {}}
                  isInCompare={() => false}
                />
                <div className="flex shrink-0 flex-col gap-2 pt-1">
                  <EditListingButton listingId={listing.id} />
                  <DeleteListingButton listingId={listing.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MyListingsEmpty />
      )}
    </div>
  );
}
