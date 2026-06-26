import { GitCompareArrows } from "lucide-react";

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
        <GitCompareArrows
          className="size-4 shrink-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        {compared ? "Im Vergleich" : "Vergleichen"}
      </button>
    </div>
  );
}
