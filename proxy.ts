import { removeTokensFromResponse, verifyUserProfile } from "@/lib/auth-proxy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const accessToken = request.cookies.get("access_token")?.value;

  if (refreshToken) {
    const nextResponse = NextResponse.next();

    const userProfileResponse = await verifyUserProfile(request, nextResponse);

    if (userProfileResponse.success) {
      return nextResponse;
    } else {
      const redirectResponse = NextResponse.redirect(
        new URL("/login", request.url),
      );
      removeTokensFromResponse(redirectResponse);
      return redirectResponse;
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/me"],
};
