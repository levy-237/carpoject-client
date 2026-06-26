import MyListingsView from "@/components/me/MyListingsView";
import { createPageMetadata } from "@/lib/metadata";
import { fetchMyListings } from "@/lib/listings-my";

export const metadata = createPageMetadata("Meine Anzeigen");

export default async function MeListingsPage() {
  const response = await fetchMyListings();

  if (!response.success) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
        <h1 className="text-2xl font-semibold text-gray-900">Meine Anzeigen</h1>
        <p className="mt-8 text-sm text-red-600">{response.message}</p>
      </div>
    );
  }

  return <MyListingsView listings={response.results} count={response.count} />;
}
