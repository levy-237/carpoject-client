import ListingResultsSkeleton from "@/components/skeletons&&errors/ListingResultsSkeleton";
import ListingSidebarSkeleton from "@/components/skeletons&&errors/ListingSidebarSkeleton";

export default function Loading() {
  return (
    <main className="flex w-full items-start justify-center gap-6 px-4 py-10">
      <ListingSidebarSkeleton />
      <ListingResultsSkeleton />
    </main>
  );
}
