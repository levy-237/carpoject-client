import type {
  AuthMeErrorResponse,
  AuthMeResponse,
  UserProfile,
} from "@/types/users";
import { cookies } from "next/headers";

export const accessTokenCookie = {
  name: "access_token",
  httpOnly: true,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 20,
} as const;

export const refreshTokenCookie = {
  name: "refresh_token",
  httpOnly: true,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30,
} as const;

export const setRefreshToken = async (refreshToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    ...refreshTokenCookie,
    value: refreshToken,
  });
};

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(accessTokenCookie.name)?.value ?? null;
}

const removeAccessToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(accessTokenCookie.name);
};

const removeRefreshToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(refreshTokenCookie.name);
};

export const removeTokens = async () => {
  await removeAccessToken();
  await removeRefreshToken();
};

export function createAuthMeError(message: string): AuthMeErrorResponse {
  return {
    success: false,
    message,
    data: null,
    accessToken: null,
  };
}

export async function getUserProfile(): Promise<AuthMeResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return createAuthMeError("Could not get user profile");
  }

  const response = await fetch(`${process.env.API_BASE_URL}users/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return createAuthMeError("Could not get user profile");
  }

  const data = (await response.json()) as UserProfile;

  return {
    success: true,
    message: "User profile fetched successfully",
    data,
  };
}
