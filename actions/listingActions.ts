"use server";

import { getAccessToken } from "@/lib/auth";

type ToggleFavouriteResponse = {
  success: boolean;
  message: string;
};

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
