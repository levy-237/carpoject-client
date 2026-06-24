function ListingRowSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-6 w-20 rounded-full bg-gray-200" />
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="flex flex-col md:flex-row">
            <div className="aspect-[4/3] w-full bg-gray-200 md:aspect-auto md:h-40 md:w-[40%]" />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-7 w-28 rounded bg-gray-200" />
              <div className="mt-2 flex flex-wrap gap-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
              <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 flex-col gap-2 sm:flex">
          <div className="h-10 w-32 rounded-xl bg-gray-200" />
          <div className="h-10 w-32 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function MeLayoutSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Inhalt wird geladen"
      className="min-w-0 flex-1 animate-pulse rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10"
    >
      <div className="h-8 w-48 rounded-lg bg-gray-200" />
      <div className="mt-2 h-4 w-24 rounded bg-gray-200" />

      <div className="mt-8 flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <ListingRowSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
