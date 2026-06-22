"use client";

import { useQueryState } from "nuqs";
import { detailSearchParsers } from "@/lib/detail-search";

const PAGE_SIZE = 15;

type PaginationProps = {
  count: number;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

export default function Pagination({ count }: PaginationProps) {
  const [offset, setOffset] = useQueryState(
    "offset",
    detailSearchParsers.offset,
  );
  const offsetNum = Number(offset) || 0;

  const hasPrevious = offsetNum > 0;
  const hasNext = offsetNum + PAGE_SIZE < count;
  const rangeStart = count === 0 ? 0 : offsetNum + 1;
  const rangeEnd = Math.min(offsetNum + PAGE_SIZE, count);
  const currentPage = Math.floor(offsetNum / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrevious() {
    if (!hasPrevious) return;

    setOffset(offsetNum <= PAGE_SIZE ? null : String(offsetNum - PAGE_SIZE));
    scrollToTop();
  }

  function goNext() {
    if (!hasNext) return;

    setOffset(String(offsetNum + PAGE_SIZE));
    scrollToTop();
  }

  return (
    <nav
      aria-label="Seitennavigation"
      className="flex flex-col gap-4 rounded-2xl  from-gray-50 to-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-gray-500">
        Zeige{" "}
        <span className="font-semibold tabular-nums text-gray-900">
          {rangeStart}–{rangeEnd}
        </span>{" "}
        von{" "}
        <span className="font-semibold tabular-nums text-gray-900">
          {count}
        </span>
      </p>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <span className="hidden text-xs font-medium tracking-wide text-gray-400 uppercase sm:inline">
          Seite
        </span>

        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={goPrevious}
            disabled={!hasPrevious}
            aria-label="Vorherige Seite"
            className="flex size-9 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
          >
            <ChevronIcon direction="left" />
          </button>

          <span className="min-w-14 px-2 text-center text-sm font-medium tabular-nums text-gray-700">
            {currentPage}
            <span className="text-gray-400"> / {totalPages}</span>
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={!hasNext}
            aria-label="Nächste Seite"
            className="flex size-9 items-center justify-center rounded-full bg-gray-900 text-white transition-all duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </nav>
  );
}
