function CategoryCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl bg-gray-100/60 p-4">
      <div className="h-30 w-55 rounded-lg bg-gray-200" />
      <div className="h-4 w-24 rounded bg-gray-200" />
    </div>
  );
}

function DealCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="aspect-[4/3] w-full bg-gray-200" />
      <div className="space-y-2 p-4">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function LandingPageSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Seite wird geladen"
      className="flex flex-1 animate-pulse flex-col"
    >
      <section className="flex h-fit items-center justify-center px-4 py-30 max-md:py-5">
        <div className="w-full max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
          <div className="h-12 w-full rounded-full bg-gray-200" />

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-10 rounded-lg bg-gray-200" />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-10 rounded-lg bg-gray-200" />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="h-10 w-36 rounded-full bg-gray-200" />
            <div className="h-10 w-28 rounded-full bg-gray-200" />
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6 h-7 w-48 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 pb-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6 h-7 w-32 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <DealCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
