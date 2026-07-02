import { Suspense } from "react";
import ListingResults from "@/components/listings/ListingResults";
import ListingResultsSkeleton from "@/components/skeletons&&errors/ListingResultsSkeleton";
import ListingSidebar from "@/components/listings/ListingSidebar";
import { getUserProfile } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("Fahrzeuge");

export default async function ListingsPage() {
  const response = await getUserProfile();
  const user = response?.success ? response.data : null;
  return (
    <main className="flex w-full gap-6 px-4 py-10 flex-row items-start justify-center mt-5">
      <ListingSidebar />

      <Suspense fallback={<ListingResultsSkeleton />}>
        <ListingResults user={user} />
      </Suspense>
    </main>
  );
}
