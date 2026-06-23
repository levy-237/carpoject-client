import Link from "next/link";

function HeartEmptyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 text-gray-400"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function FavouriteListingsEmpty() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <HeartEmptyIcon />
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
