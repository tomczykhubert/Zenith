import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./middlewareFactory";
import PUBLIC_PATHS from "@/lib/routes/publicRoutes";
import { routes } from "@/lib/routes/routes";
import { i18n } from "@/lib/i18n/config";
import { getSessionCookie } from "better-auth/cookies";

export const withAuthentication: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    const pathWithoutLocale = i18n.locales.some((locale) =>
      pathname.startsWith(`/${locale}/`)
    )
      ? pathname.split("/").slice(2).join("/")
      : pathname;

    const isPublic = PUBLIC_PATHS.some((path) => {
      const normalizedPublicPath = normalizePath(path);
      const normalizedPath = normalizePath(pathWithoutLocale);
      return normalizedPath === normalizedPublicPath;
    });
    if (sessionCookie || isPublic) {
      return next(request, _next);
    }

    const isApiPath = request.nextUrl.pathname.startsWith("/api");
    if (isApiPath) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL(routes.auth.signIn, request.url));
  };
};

function normalizePath(path: string) {
  path = startsWithSlash(path);
  path = endsWithSlash(path);
  return path;
}

function startsWithSlash(path: string) {
  return path.startsWith("/") ? path : "/" + path;
}

function endsWithSlash(path: string) {
  return path.startsWith("/") ? path : "/" + path;
}
