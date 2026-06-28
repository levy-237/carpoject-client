const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type ListingItem = {
  id: number;
  title: string;
  price: string;
  year: number;
  mileage: string;
  location: string;
  drivetrain: string;
  image: string;
  link: string;
};

type IdName = {
  id: number;
  name: string;
};

type Owner = {
  id: number;
  username: string;
};

type ModelTrimDetail = {
  id: number;
  name: string;
  max_ac_charge_kw: number;
  max_dc_charge_kw: number;
  twenty_to_eighty_charge_min: number;
  drivetrain: number;
  drivetrain_detail: IdName;
};

type ListingImage = {
  id: number;
  local_url: string;
  image: string;
  storage_key: string;
  created_at: string;
  is_cover: boolean;
};

export type Listing = {
  id: number;
  url: string;
  publish_date: string;
  owner: Owner;
  title: string;

  brand: number;
  brand_detail: IdName;

  model: number;
  model_detail: IdName;

  model_trim: number;
  model_trim_detail: ModelTrimDetail;

  makeyear: string;
  price: number;
  price_history: unknown[];

  body_type: number;
  body_type_detail: IdName;

  mileage: number;

  condition: number;
  condition_detail: IdName;

  power: number;
  battery_health: number | null;

  real_summer_range: number | null;
  real_winter_range: number | null;

  heat_pump: boolean;
  garantie: boolean;
  pickerl: boolean;

  description: string;
  view_count: number;
  is_online: boolean;
  is_premium: boolean;
  is_sold: boolean;
  is_under_review: boolean;
  is_reserved: boolean;

  images: ListingImage[];
  favourite_count: number;
  cover_image: ListingImage | null;
};

export type ListingsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Listing[];
};

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
): Promise<ListingsResponse> {
  const fetchurl = queryString
    ? `${API_BASE_URL}listings/?${queryString}`
    : `${API_BASE_URL}listings/`;

  console.log(fetchurl);

  const response = await fetch(fetchurl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch listings (${response.status})`);
  }

  return response.json();
}

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
    };
  }
  console.log(data);

  return {
    success: true,
    ...data,
  };
}

type TopDealsResponse = {
  success: boolean;
  message: string;
  listings?: Listing[];
};

export async function fetchTopDeals(): Promise<TopDealsResponse> {
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
      listings: [],
    };
  }

  return {
    success: true,
    message: "Top deals fetched successfully",
    listings: data.results,
  };
}
