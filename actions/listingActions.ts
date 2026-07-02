"use server";

import { getAccessToken } from "@/lib/auth";
import { formatToYYYYMMDD } from "@/lib/format";
import { AddListingSchema } from "@/schemas/listings";
import type {
  AddListingFormValues,
  MutateListingResponse,
  ToggleFavouriteResponse,
} from "@/types/listings";

export async function createListing(
  data: AddListingFormValues,
): Promise<MutateListingResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  const parsed = AddListingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Ungültige Formulardaten.",
      data: null,
    };
  }

  const payload = {
    ...parsed.data,
    makeyear: formatToYYYYMMDD(parsed.data.makeyear),
  };

  const response = await fetch(`${process.env.API_BASE_URL}listings/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.log("error", responseData);
    return {
      success: false,
      message:
        responseData.detail ||
        responseData.error ||
        "Anzeige konnte nicht erstellt werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: "Anzeige wurde erstellt.",
    data: { listingId: responseData.id },
  };
}

export async function updateListing({
  id,
  data,
}: {
  id: number;
  data: AddListingFormValues;
}): Promise<MutateListingResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert.", data: null };
  }

  const parsed = AddListingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Ungültige Formulardaten.",
      data: null,
    };
  }

  const payload = {
    ...parsed.data,
    makeyear: formatToYYYYMMDD(parsed.data.makeyear),
  };

  const response = await fetch(`${process.env.API_BASE_URL}listings/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.log("error", responseData);
    return {
      success: false,
      message:
        responseData.detail ||
        responseData.error ||
        "Anzeige konnte nicht aktualisiert werden.",
      data: null,
    };
  }

  return {
    success: true,
    message: "Anzeige wurde aktualisiert.",
    data: { listingId: id },
  };
}

export async function toggleFavourite(
  listingId: number,
): Promise<ToggleFavouriteResponse> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { success: false, message: "Unauthorized", data: null };
  }
  const response = await fetch(
    `${process.env.API_BASE_URL}listings/update-favourite/${listingId}/`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    console.log(response);

    return {
      success: false,
      message: data.detail || data.error || "Failed to toggle favourite",
      data: null,
    };
  }

  console.log(data);
  return { success: true, message: data.message, data: null };
}
