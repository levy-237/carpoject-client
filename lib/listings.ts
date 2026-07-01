import type {
  Listing,
  ListingArrayResponse,
  ListingDetailResponse,
  ListingListResponse,
  ListingsResponse,
} from "@/types/listings";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatYear(makeyear: string): number {
  return new Date(makeyear).getFullYear();
}

export function formatMileage(mileage: number): string {
  return `${mileage.toLocaleString("de-DE")} km`;
}

export async function fetchListings(
  queryString: string,
): Promise<ListingListResponse> {
  const fetchurl = queryString
    ? `${API_BASE_URL}listings/?${queryString}`
    : `${API_BASE_URL}listings/`;

  console.log(fetchurl);

  const response = await fetch(fetchurl, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      success: false,
      message: `Failed to fetch listings (${response.status})`,
      data: null,
    };
  }

  const data = (await response.json()) as ListingsResponse;

  return {
    success: true,
    message: "Listings fetched successfully",
    data,
  };
}

export async function fetchListingDetail(
  id: number,
): Promise<ListingDetailResponse> {
  const response = await fetch(`${API_BASE_URL}listings/${id}/`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Failed to fetch listing",
      data: null,
    };
  }
  console.log(data);

  return {
    success: true,
    message: "Listing fetched successfully",
    data: data as Listing,
  };
}

export async function fetchTopDeals(): Promise<ListingArrayResponse> {
  const fetchurl = `${API_BASE_URL}listings/most-viewed/`;

  console.log(fetchurl);

  const response = await fetch(fetchurl, {
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      success: false,
      message: data.detail || data.error || "Failed to fetch top deals",
      data: null,
    };
  }

  return {
    success: true,
    message: "Top deals fetched successfully",
    data: data.results as Listing[],
  };
}
