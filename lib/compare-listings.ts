import { Listing, ListingsResponse } from "./listings";

type CompareListingResponse = {
  success: boolean;
  message: string;
  listings: Listing[];
};

export async function fetchCompareListings(
  queryString: string,
): Promise<CompareListingResponse> {
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
      listings: [],
    };
  }

  return {
    success: true,
    message: "Listings fetched successfully",
    listings: data.results,
  };
}
