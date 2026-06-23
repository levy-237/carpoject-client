import { Suspense } from "react";
import ListingResults from "@/components/listings/ListingResults";
import ListingResultsSkeleton from "@/components/skeletons&&errors/ListingResultsSkeleton";
import ListingSidebarSkeleton from "@/components/skeletons&&errors/ListingSidebarSkeleton";
import ListingSidebar from "@/components/listings/ListingSidebar";
import { getUserProfile } from "@/lib/auth";

export default async function ListingsPage() {
  const response = await getUserProfile();
  const user = response?.success ? response : null;
  return (
    <main className="flex w-full gap-6 px-4 py-10 flex-row items-start justify-center">
      <Suspense fallback={<ListingSidebarSkeleton />}>
        <ListingSidebar />
      </Suspense>
      <Suspense fallback={<ListingResultsSkeleton />}>
        <ListingResults user={user} />
      </Suspense>
    </main>
  );
}
