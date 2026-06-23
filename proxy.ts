import { removeTokensFromResponse, verifyUserProfile } from "@/lib/auth-proxy";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_AUTH_PATHS = ["/login", "/sign-up", "/forgot-password"];

function shouldRedirectToLogin(pathname: string) {
  if (
    PUBLIC_AUTH_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return false;
  }

  return pathname === "/me" || pathname.startsWith("/me/");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiresAuth = shouldRedirectToLogin(pathname);

  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (refreshToken) {
    const nextResponse = NextResponse.next();

    const userProfileResponse = await verifyUserProfile(request, nextResponse);

    if (userProfileResponse.success) {
      return nextResponse;
    }

    if (requiresAuth) {
      const redirectResponse = NextResponse.redirect(
        new URL("/login", request.url),
      );
      removeTokensFromResponse(redirectResponse);
      return redirectResponse;
    }

    removeTokensFromResponse(nextResponse);
    return nextResponse;
  }

  if (requiresAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
