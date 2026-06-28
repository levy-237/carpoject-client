import type { Listing } from "@/lib/listings";
import {
  formatHistoryLabel,
  formatHistoryValue,
  isRecord,
  shouldHideHistoryKey,
} from "./detailFormatters";

export default function ListingPriceHistory({ listing }: { listing: Listing }) {
  if (listing.price_history.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
        Preisverlauf
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {listing.price_history.map((entry, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm"
          >
            <p className="font-medium text-gray-900">
              Preisänderung #{index + 1}
            </p>
            {isRecord(entry) ? (
              <div className="mt-2 space-y-1">
                {Object.entries(entry)
                  .filter(([key]) => !shouldHideHistoryKey(key))
                  .map(([key, value]) => {
                    const formattedValue = formatHistoryValue(key, value);

                    if (!formattedValue) {
                      return null;
                    }

                    return (
                      <p
                        key={key}
                        className="flex justify-between gap-4 text-gray-600"
                      >
                        <span>{formatHistoryLabel(key)}</span>
                        <span className="font-medium text-gray-900">
                          {formattedValue}
                        </span>
                      </p>
                    );
                  })}
              </div>
            ) : (
              <p className="mt-1 text-gray-500">{String(entry)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
