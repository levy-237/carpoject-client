import { Suspense } from "react";
import ListingResults from "@/components/listings/ListingResults";
import ListingResultsSkeleton from "@/components/skeletons&&errors/ListingResultsSkeleton";
import ListingSidebar from "@/components/listings/ListingSidebar";

export default function ListingsPage() {
  return (
    <main className="flex w-full gap-6 px-4 py-10 flex-row items-start justify-center">
      <ListingSidebar />
      <Suspense fallback={<ListingResultsSkeleton />}>
        <ListingResults />
      </Suspense>
    </main>
  );
}
