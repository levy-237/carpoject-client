import { getAccessToken } from "@/lib/auth";
import type { ListingsResponse } from "@/lib/listings";

export type ListingsMySuccessResponse = ListingsResponse & {
  success: true;
};

export type ListingsMyErrorResponse = {
  success: false;
  message: string;
};

export type ListingsMyResponse =
  | ListingsMySuccessResponse
  | ListingsMyErrorResponse;

export async function fetchMyListings(): Promise<ListingsMyResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const response = await fetch(`${process.env.API_BASE_URL}listings/my/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Failed to fetch listings",
    };
  }

  return {
    success: true,
    ...data,
  };
}
