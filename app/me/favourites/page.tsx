import FavouriteListingsView from "@/components/me/FavouriteListingsView";
import { fetchListingsFavourite } from "@/lib/listings-favourite";

export default async function MeFavouritesPage() {
  const response = await fetchListingsFavourite();

  if (!response.success) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
        <h1 className="text-2xl font-semibold text-gray-900">Favoriten</h1>
        <p className="mt-8 text-sm text-red-600">{response.message}</p>
      </div>
    );
  }

  return (
    <FavouriteListingsView listings={response.results} count={response.count} />
  );
}
