import type { Listing } from "@/types/listings";
import { getListingStatus } from "../listingDisplay";

function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

export default function ListingStatusBadges({ listing }: { listing: Listing }) {
  const status = getListingStatus(listing);

  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge {...status} />
      {listing.is_premium && (
        <StatusBadge
          label="Premium"
          className="bg-amber-100 text-amber-800"
        />
      )}
    </div>
  );
}
