function ListingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex min-w-0 w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white md:h-100 md:flex-row"
    >
      <div className="aspect-[4/3] w-full shrink-0 bg-gray-200 md:aspect-auto md:h-full md:w-[40%]" />

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
        <div className="mt-4 h-8 w-28 rounded bg-gray-200" />

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="h-6 w-20 rounded-full bg-gray-200" />
          <div className="h-6 w-24 rounded-full bg-gray-200" />
          <div className="h-6 w-28 rounded-full bg-gray-200" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-3 w-12 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function ListingResultsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Ergebnisse werden geladen"
      className="flex min-w-0 w-full max-w-4xl flex-1 flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200 lg:hidden" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ListingCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
