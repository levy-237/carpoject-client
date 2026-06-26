function FilterFieldSkeleton({ hasLabel = true }: { hasLabel?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {hasLabel ? <div className="h-4 w-20 rounded bg-gray-200" /> : null}
      <div className="h-10 w-full rounded-lg bg-gray-200" />
    </div>
  );
}

function RangeFieldSkeleton({ labelWidth = "w-16" }: { labelWidth?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-4 ${labelWidth} rounded bg-gray-200`} />
      <div className="flex gap-2">
        <div className="h-10 flex-1 rounded-lg bg-gray-200" />
        <div className="h-10 flex-1 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export default function ListingSidebarSkeleton() {
  return (
    <aside
      aria-busy="true"
      aria-label="Filter werden geladen"
      aria-hidden="true"
      className="flex w-95 shrink-0 animate-pulse flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg max-lg:hidden"
    >
      <div className="h-10 w-full rounded-lg bg-gray-200" />

      <FilterFieldSkeleton />

      <FilterFieldSkeleton />
      <FilterFieldSkeleton />
      <FilterFieldSkeleton />
      <FilterFieldSkeleton />
      <FilterFieldSkeleton />

      <RangeFieldSkeleton labelWidth="w-16" />
      <RangeFieldSkeleton labelWidth="w-28" />
      <RangeFieldSkeleton labelWidth="w-14" />

      <div className="mt-2 h-11 w-full rounded-full bg-gray-200" />

      <div className="flex flex-col gap-3 pt-1">
        <div className="h-10 w-full rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </aside>
  );
}
