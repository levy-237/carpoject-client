function CompareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
      <path d="m21 3-7 7" />
      <path d="m3 3 7 7" />
    </svg>
  );
}

export default function ModifyListingCompare({
  id,
  handleAddToCompare,
  isInCompare,
}: {
  id: number;
  handleAddToCompare: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => void;
  isInCompare: (id: number) => boolean;
}) {
  const compared = isInCompare(id);

  return (
    <div className="absolute top-12 right-3 z-10">
      <button
        type="button"
        onClick={(event) => handleAddToCompare(event, id)}
        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur-sm transition-colors duration-200 ${
          compared
            ? "border-blue-200 bg-blue-50/95 text-blue-700 hover:border-blue-300 hover:bg-blue-100"
            : "border-gray-200/80 bg-white/95 text-gray-700 hover:border-gray-300 hover:bg-white"
        }`}
        aria-pressed={compared}
      >
        <CompareIcon />
        {compared ? "Im Vergleich" : "Vergleichen"}
      </button>
    </div>
  );
}
