import Link from "next/link";

export default function ListingCompareButton({
  compareListings,
}: {
  compareListings: number[];
}) {
  const count = compareListings.length;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <Link
        href={`/compare?compare=${compareListings.join(",")}`}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-black/5 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-xl"
        onClick={(e) => {
          if (count < 2) {
            e.preventDefault();
            e.stopPropagation();
            alert("Du kannst mindestens 2 Fahrzeuge vergleichen");
          }
        }}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
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
          className="size-4 text-gray-500"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
