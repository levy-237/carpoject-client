import Link from "next/link";
import FavoriteListingButton from "@/components/listings/FavoriteListingButton";
import ListingImageGallery from "@/components/listings/ListingImageGallery";
import type { Listing } from "@/lib/listings";
import { formatMileage, formatPrice, formatYear } from "@/lib/listings";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 text-sm">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
      {children}
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ListingDetailView({
  listing,
  isFavourite,
}: {
  listing: Listing;
  isFavourite: boolean;
}) {
  const year = formatYear(listing.makeyear);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link
        href="/listings"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Zurück zu den Anzeigen
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <ListingImageGallery listing={listing} />

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {listing.is_premium && (
                  <span className="mb-2 inline-flex rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-800">
                    Premium-Anzeige
                  </span>
                )}
                <h1 className="text-2xl font-semibold text-gray-900">
                  {listing.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {listing.brand_detail.name}
                  <span className="mx-1.5 text-gray-300">·</span>
                  {listing.model_detail.name}
                  <span className="mx-1.5 text-gray-300">·</span>
                  {listing.model_trim_detail.name}
                </p>
              </div>

              <FavoriteListingButton
                isFavourite={isFavourite}
                listingId={listing.id}
              />
            </div>

            <p className="mt-6 text-3xl font-bold text-gray-900">
              {formatPrice(listing.price)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <InfoPill>{formatMileage(listing.mileage)}</InfoPill>
              <InfoPill>Baujahr {year}</InfoPill>
              <InfoPill>{listing.power} PS</InfoPill>
              {listing.real_summer_range && (
                <InfoPill>Sommer {listing.real_summer_range} km</InfoPill>
              )}
              {listing.real_winter_range && (
                <InfoPill>Winter {listing.real_winter_range} km</InfoPill>
              )}
              {listing.battery_health && (
                <InfoPill>Batterie {listing.battery_health}%</InfoPill>
              )}
              {listing.heat_pump && <InfoPill>Wärmepumpe</InfoPill>}
              {listing.garantie && <InfoPill>Garantie</InfoPill>}
              {listing.pickerl && <InfoPill>Pickerl</InfoPill>}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {listing.view_count.toLocaleString("de-DE")} Aufrufe ·{" "}
              {listing.favourite_count.toLocaleString("de-DE")} Favoriten
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Fahrzeugdetails
            </h2>
            <dl className="mt-2">
              <DetailRow
                label="Zustand"
                value={listing.condition_detail.name}
              />
              <DetailRow
                label="Karosserie"
                value={listing.body_type_detail.name}
              />
              {listing.model_trim_detail.drivetrain_detail && (
                <DetailRow
                  label="Antrieb"
                  value={listing.model_trim_detail.drivetrain_detail.name}
                />
              )}
              <DetailRow
                label="Veröffentlicht"
                value={formatDate(listing.publish_date)}
              />
              {listing.model_trim_detail.max_dc_charge_kw > 0 && (
                <DetailRow
                  label="DC-Laden"
                  value={`${listing.model_trim_detail.max_dc_charge_kw} kW`}
                />
              )}
              {listing.model_trim_detail.max_ac_charge_kw > 0 && (
                <DetailRow
                  label="AC-Laden"
                  value={`${listing.model_trim_detail.max_ac_charge_kw} kW`}
                />
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Anbieter
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                {listing.owner.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {listing.owner.username}
                </p>
                <p className="text-xs text-gray-500">Anbieter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {listing.description && (
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Beschreibung
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700">
            {listing.description}
          </p>
        </section>
      )}
    </main>
  );
}
