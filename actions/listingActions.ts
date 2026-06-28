"use server";

import { getAccessToken } from "@/lib/auth";
import { formatToYYYYMMDD } from "@/lib/format";
import {
  AddListingSchema,
  type AddListingFormValues,
} from "@/schemas/listings";

type ToggleFavouriteResponse = {
  success: boolean;
  message: string;
};

export type MutateListingResponse = {
  success: boolean;
  message: string;
  listingId?: number;
};

export async function createListing(
  data: AddListingFormValues,
): Promise<MutateListingResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, message: "Nicht autorisiert." };
  }

  const parsed = AddListingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Ungültige Formulardaten.",
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
    };
  }

  return {
    success: true,
    message: "Anzeige wurde erstellt.",
    listingId: responseData.id,
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
    return { success: false, message: "Nicht autorisiert." };
  }

  const parsed = AddListingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Ungültige Formulardaten.",
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
    };
  }

  return {
    success: true,
    message: "Anzeige wurde aktualisiert.",
    listingId: id,
  };
}

export async function toggleFavourite(
  listingId: number,
): Promise<ToggleFavouriteResponse> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
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
    };
  }

  console.log(data);
  return { success: true, message: data.message };
}
