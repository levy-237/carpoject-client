import ListingDetailView from "@/components/listings/ListingDetailView";
import { getUserProfile } from "@/lib/auth";
import { fetchListingDetail } from "@/lib/listings";
import { notFound } from "next/navigation";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listingId = Number(id);

  if (Number.isNaN(listingId)) {
    notFound();
  }

  const [listingResponse, userResponse] = await Promise.all([
    fetchListingDetail(listingId),
    getUserProfile(),
  ]);

  if (!listingResponse.success) {
    notFound();
  }

  const user = userResponse.success ? userResponse : null;
  const isFavourite =
    user?.favourite_listings.includes(listingResponse.id) ?? false;

  return (
    <ListingDetailView listing={listingResponse} isFavourite={isFavourite} />
  );
}
