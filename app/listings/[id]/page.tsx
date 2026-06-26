import ListingDetailView from "@/components/listings/ListingDetailView";
import { getUserProfile } from "@/lib/auth";
import { createPageMetadata } from "@/lib/metadata";
import { fetchListingDetail } from "@/lib/listings";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ListingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const listingId = Number(id);

  if (Number.isNaN(listingId)) {
    return createPageMetadata("Anzeige");
  }

  const listing = await fetchListingDetail(listingId);

  if (!listing.success) {
    return createPageMetadata("Anzeige");
  }

  return createPageMetadata(listing.title);
}

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
