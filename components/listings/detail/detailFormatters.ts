import { formatDate } from "@/lib/format";
import { formatPrice } from "@/lib/listings";
import { formatBoolean } from "../listingDisplay";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function shouldHideHistoryKey(key: string) {
  const normalizedKey = key.toLowerCase();

  return (
    normalizedKey === "id" ||
    normalizedKey.endsWith("_id") ||
    normalizedKey.includes("url") ||
    normalizedKey.includes("storage") ||
    normalizedKey.includes("image")
  );
}

export function formatHistoryLabel(key: string) {
  const labels: Record<string, string> = {
    price: "Preis",
    old_price: "Alter Preis",
    previous_price: "Alter Preis",
    new_price: "Neuer Preis",
    created_at: "Erstellt am",
    updated_at: "Aktualisiert am",
    changed_at: "Geändert am",
    date: "Datum",
  };

  return (
    labels[key] ??
    key
      .replaceAll("_", " ")
      .replace(/^\w/, (letter) => letter.toUpperCase())
  );
}

export function formatHistoryValue(key: string, value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return key.toLowerCase().includes("price")
      ? formatPrice(value)
      : value.toLocaleString("de-DE");
  }

  if (typeof value === "boolean") {
    return formatBoolean(value);
  }

  if (typeof value === "string") {
    const maybeDate = new Date(value);

    if (
      (key.toLowerCase().includes("date") ||
        key.toLowerCase().endsWith("_at")) &&
      !Number.isNaN(maybeDate.getTime())
    ) {
      return formatDate(value);
    }

    return value;
  }

  return null;
}
