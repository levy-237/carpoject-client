import {
  AuthMeErrorResponse,
  AuthMeResponse,
  type UserProfile,
} from "@/actions/authActions";
import {
  accessTokenCookie,
  createAuthMeError,
  refreshTokenCookie,
} from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type TokenRefreshResult =
  | AuthMeErrorResponse
  | { success: true; accessToken: string };

export function removeTokensFromResponse(response: NextResponse) {
  response.cookies.delete(accessTokenCookie.name);
  response.cookies.delete(refreshTokenCookie.name);
}

function setAccessTokenOnResponse(response: NextResponse, accessToken: string) {
  response.cookies.set({
    ...accessTokenCookie,
    value: accessToken,
  });
}

async function refreshToken(
  request: NextRequest,
  response: NextResponse,
): Promise<TokenRefreshResult> {
  const refreshToken = request.cookies.get(refreshTokenCookie.name)?.value;

  if (!refreshToken) {
    console.log("No refresh token to refresh");
    removeTokensFromResponse(response);
    return createAuthMeError("Your session expired, please log in again");
  }

  const apiResponse = await fetch(
    `${process.env.API_BASE_URL}users/token/refresh/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    },
  );

  if (!apiResponse.ok) {
    console.log("refresh token exists but failed to refresh");
    removeTokensFromResponse(response);
    return createAuthMeError("Your session expired, please log in again");
  }

  const data = await apiResponse.json();

  setAccessTokenOnResponse(response, data.access);

  console.log("successfully refresh token");

  return {
    success: true,
    accessToken: data.access,
  };
}

async function retryGetUserProfile(
  request: NextRequest,
  response: NextResponse,
): Promise<AuthMeResponse> {
  const refreshResult = await refreshToken(request, response);

  if (!refreshResult.success) {
    return refreshResult;
  }

  const retryResponse = await fetch(`${process.env.API_BASE_URL}users/me/`, {
    headers: {
      Authorization: `Bearer ${refreshResult.accessToken}`,
    },
    cache: "no-store",
  });

  if (!retryResponse.ok) {
    removeTokensFromResponse(response);
    return createAuthMeError("Could not get user profile");
  }

  const retriedData = (await retryResponse.json()) as UserProfile;
  return {
    ...retriedData,
    success: true,
    accessToken: refreshResult.accessToken,
  };
}

export async function verifyUserProfile(
  request: NextRequest,
  response: NextResponse,
): Promise<AuthMeResponse> {
  const accessToken = request.cookies.get(accessTokenCookie.name)?.value;

  if (!accessToken) {
    return retryGetUserProfile(request, response);
  }

  const apiResponse = await fetch(`${process.env.API_BASE_URL}users/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (apiResponse.status === 401) {
    return retryGetUserProfile(request, response);
  }
  if (!apiResponse.ok) {
    removeTokensFromResponse(response);
    return createAuthMeError("Could not get user profile");
  }

  const data = (await apiResponse.json()) as UserProfile;

  return {
    ...data,
    success: true,
  };
}
