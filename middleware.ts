import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_CONFIG, PUBLIC_PATHS } from "@/lib/auth/config";
import { apiRoutes } from "./lib/routes/apiRoutes";
const LOCALES = ["en", "pl"];

function getLocale(request: NextRequest) {
  const defaultLocale = "en";
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  return pathnameIsMissingLocale ? defaultLocale : pathname.split("/")[1];
}

async function handleAuth(request: NextRequest) {
  const token = request.cookies.get(AUTH_CONFIG.accessToken.name);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = NextResponse.next();
    return response;
  } catch {
    const refreshToken = request.cookies.get(AUTH_CONFIG.refreshToken.name);

    if (!refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const response = await fetch(
        `${request.nextUrl.origin}${apiRoutes.auth.refresh}`,
        {
          method: "POST",
          headers: {
            Cookie: `${AUTH_CONFIG.refreshToken.name}=${refreshToken.value}`,
          },
        }
      );

      if (!response.ok) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const newResponse = NextResponse.next();
      return newResponse;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return handleAuth(request);
  }

  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
