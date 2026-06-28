import type { Listing } from "@/lib/listings";

export function formatBoolean(value: boolean) {
  return value ? "Ja" : "Nein";
}

export function formatOptionalValue(
  value: string | number | null | undefined,
  suffix = "",
) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return typeof value === "number"
    ? `${value.toLocaleString("de-DE")}${suffix}`
    : `${value}${suffix}`;
}

export function formatPositiveNumber(
  value: number | null | undefined,
  suffix = "",
) {
  return value == null || value <= 0
    ? "—"
    : `${value.toLocaleString("de-DE")}${suffix}`;
}

export function getListingStatus(listing: Listing) {
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
