import Link from "next/link";

export default function ListingCompareButton({
  compareListings,
  removeComparison,
}: {
  compareListings: number[];
  removeComparison: () => void;
}) {
  const count = compareListings.length;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex items-stretch overflow-hidden rounded-full border border-gray-200 bg-white shadow-lg ring-1 ring-black/5">
        <button
          type="button"
          onClick={removeComparison}
          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          Löschen
        </button>

        <div className="w-px self-stretch bg-gray-200" aria-hidden="true" />

        <Link
          href={`/compare?compare=${compareListings.join(",")}`}
          className="inline-flex items-center gap-3 border-l border-blue-100 bg-blue-50/95 px-5 py-3 text-sm font-semibold text-blue-700 transition-colors duration-200 hover:bg-blue-100"
          onClick={(e) => {
            if (count < 2) {
              e.preventDefault();
              e.stopPropagation();
              alert("Du kannst mindestens 2 Fahrzeuge vergleichen");
            }
          }}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold tabular-nums text-blue-800">
            {count}
          </span>
          <span>
            {count === 1 ? "Fahrzeug vergleichen" : "Fahrzeuge vergleichen"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 text-blue-600"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
