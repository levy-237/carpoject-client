"use client";

import { SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DetailSearchModal from "@/components/filters/DetailSearchModal";
import {
  detailSearchParsers,
  type DetailSearchFormState,
} from "@/lib/detail-search";
import { type inferParserType } from "nuqs/server";

type ListingResultsEmptyProps = {
  filters: inferParserType<typeof detailSearchParsers>;
};

function hasActiveFilters(filters: DetailSearchFormState): boolean {
  for (const [key, value] of Object.entries(filters)) {
    if (key === "offset") continue;

    if (typeof value === "string" && value.trim()) {
      return true;
    }

    if (Array.isArray(value) && value.length > 0) {
      return true;
    }

    if (value === "true" || value === "false") {
      return true;
    }
  }

  return false;
}

export default function ListingResultsEmpty({
  filters,
}: ListingResultsEmptyProps) {
  const router = useRouter();
  const filtersActive = hasActiveFilters(filters);

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <SearchX
          className="size-8 text-gray-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">
        Keine Fahrzeuge gefunden
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        {filtersActive
          ? "Mit deinen aktuellen Filtern konnten wir leider keine passenden Anzeigen finden. Passe die Suche an oder setze alle Filter zurück."
          : "Aktuell sind keine Fahrzeuge verfügbar. Schau später noch einmal vorbei oder starte eine neue Suche."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {filtersActive ? (
          <>
            <button
              type="button"
              onClick={() => router.push("/listings")}
              className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
            >
              Filter zurücksetzen
            </button>
            <DetailSearchModal />
          </>
        ) : (
          <Link
            href="/"
            className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
          >
            Zur Startseite
          </Link>
        )}
      </div>
    </div>
  );
}
