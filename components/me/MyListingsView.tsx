"use client";

import ListingCard from "@/components/listings/ListingCard";
import MyListingsEmpty from "@/components/me/MyListingsEmpty";
import type { Listing } from "@/lib/listings";
import Link from "next/link";

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

function EditListingButton({ listingId }: { listingId: number }) {
  return (
    <Link
      href={`/me/listings/${listingId}`}
      className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
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
