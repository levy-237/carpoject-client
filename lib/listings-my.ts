import { getAccessToken } from "@/lib/auth";
import type { Listing, ListingsResponse } from "@/lib/listings";
import { AddListingFormValues } from "@/schemas/listings";

export type ListingsMySuccessResponse = ListingsResponse & {
  success: true;
};

export type ListingsMyErrorResponse = {
  success: false;
  message: string;
};

export type ListingDetailSuccessResponse = Listing & {
  success: true;
};

export type ListingDetailErrorResponse = {
  success: false;
  message: string;
};

export type ListingDetailResponse =
  | ListingDetailSuccessResponse
  | ListingDetailErrorResponse;

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
export async function fetchMyListingsById(
  id: number,
): Promise<ListingDetailResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const response = await fetch(
    `${process.env.API_BASE_URL}listings/my/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const data = await response.json();
  console.log(data);
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

export function myListingFetchToEditForm(
  listing: ListingDetailSuccessResponse,
): AddListingFormValues {
  return {
    title: listing.title,
    description: listing.description,
    brand: listing.brand,
    model: listing.model,
    model_trim: listing.model_trim,
    makeyear: listing.makeyear.slice(0, 10),
    price: listing.price,
    body_type: listing.body_type,
    mileage: listing.mileage,
    condition: listing.condition,
    power: listing.power,
    battery_health: listing.battery_health ?? undefined,
    real_summer_range: listing.real_summer_range ?? undefined,
    real_winter_range: listing.real_winter_range ?? undefined,
    heat_pump: listing.heat_pump,
    garantie: listing.garantie,
    pickerl: listing.pickerl,
    is_sold: listing.is_sold,
    is_reserved: listing.is_reserved,
  };
}
