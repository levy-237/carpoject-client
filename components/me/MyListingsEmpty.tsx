import Link from "next/link";

function CarEmptyIcon() {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export default function MyListingsEmpty() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <CarEmptyIcon />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Noch keine Anzeigen
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Du hast noch keine Fahrzeuge eingestellt. Erstelle deine erste Anzeige
        und erreiche Käufer auf unserer Plattform.
      </p>

      <Link
        href="/add-listings"
        className="mt-6 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
      >
        Anzeige erstellen
      </Link>
    </div>
  );
}
