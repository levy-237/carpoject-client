import { getAccessToken } from "@/lib/auth";
import type { ListingsResponse } from "@/lib/listings";

export type ListingsFavouriteSuccessResponse = ListingsResponse & {
  success: true;
};

export type ListingsFavouriteErrorResponse = {
  success: false;
  message: string;
};

export type ListingsFavouriteResponse =
  | ListingsFavouriteSuccessResponse
  | ListingsFavouriteErrorResponse;

export async function fetchListingsFavourite(): Promise<ListingsFavouriteResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
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
    };
  }

  return {
    success: true,
    ...data,
  };
}
