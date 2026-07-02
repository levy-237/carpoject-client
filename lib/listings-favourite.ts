import { getAccessToken } from "@/lib/auth";
import type { ListingListResponse, ListingsResponse } from "@/types/listings";

export async function fetchListingsFavourite(): Promise<ListingListResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}listings/favourites/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Failed to fetch favourites",
      data: null,
    };
  }

  return {
    success: true,
    message: "Favourites fetched successfully",
    data: data as ListingsResponse,
  };
}
