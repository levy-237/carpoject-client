import type { Listing, ListingArrayResponse } from "@/types/listings";

export async function fetchCompareListings(
  queryString: string,
): Promise<ListingArrayResponse> {
  const fetchurl = `${process.env.API_BASE_URL}listings/compare/?ids=${queryString}`;

  console.log(fetchurl);

  const response = await fetch(fetchurl, {
    cache: "no-store",
  });
  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Failed to fetch listings",
      data: null,
    };
  }

  return {
    success: true,
    message: "Listings fetched successfully",
    data: data.results as Listing[],
  };
}
