import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavouriteListingsEmpty() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <Heart
          className="size-8 text-gray-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Noch keine Favoriten
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Speichere interessante Fahrzeuge mit dem Herz-Symbol, um sie hier
        wiederzufinden. Schau dich in unseren Anzeigen um und finde dein
        nächstes Elektroauto.
      </p>

      <Link
        href="/listings"
        className="mt-6 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
      >
        Fahrzeuge entdecken
      </Link>
    </div>
  );
}
