import ComparationView from "@/components/compare-listings/ComparationView";
import { fetchCompareListings } from "@/lib/compare-listings";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ compare: string }>;
}) {
  const { compare } = await searchParams;

  console.log(compare);

  const response = await fetchCompareListings(compare);

  if (!response.success) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10">
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {response.message}
        </p>
      </main>
    );
  }

  return <ComparationView listings={response.listings} />;
}
