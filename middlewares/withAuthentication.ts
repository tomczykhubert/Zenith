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
import { betterFetch } from "@better-fetch/fetch";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import { Session, User } from "better-auth";
import { UserRole } from "@prisma/client";
import GUEST_PATHS from "@/lib/routes/guestRoutes";
import GUEST_ROLE_PATHS from "@/lib/routes/guestRoleRoutes";
import { HTTP_METHODS } from "next/dist/server/web/http";

type BetterUser = User & {
  role: UserRole;
};

export const withAuthentication: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    const isPublic = matchPath(pathname, PUBLIC_PATHS);
    if (isPublic) {
      return next(request, _next);
    }

    const { data: sessionData } = await fetchSession(request);

    const isGuest = matchPath(pathname, GUEST_PATHS);
    if (isGuest) {
      if (!sessionData) return next(request, _next);
      if (sessionData) return redirectToHome(request);
    }

    // Deny access to all api methods except GET and api paths accessible for guests for users with GUEST role
    if (
      request.method.toUpperCase() !== HTTP_METHODS[0] &&
      sessionData?.user?.role === UserRole.GUEST &&
      isApiPath(pathname) &&
      !matchPath(pathname, GUEST_ROLE_PATHS)
    ) {
      return unauthorized();
    }

    if (sessionData) {
      return next(request, _next);
    }

    if (isApiPath(pathname)) {
      return unauthorized();
    }

    return redirectToSignIn(request);
  };
};

function normalizeSlashes(path: string): string {
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

function removeLocalePrefix(path: string): string {
  if (i18n.locales.some((loc) => path === `/${loc}` || path === `/${loc}/`)) {
    return "/";
  }

  const locale = i18n.locales.find((loc) => path.startsWith(`/${loc}/`));

  return locale ? path.replace(`/${locale}/`, "/") : path;
}

function matchPath(testPath: string, allowedPaths: string[]): boolean {
  const normalized = normalizeSlashes(removeLocalePrefix(testPath));

  return allowedPaths.some(
    (allowedPath) => normalized === normalizeSlashes(allowedPath)
  );
}

function isApiPath(path: string) {
  return path.startsWith("/api");
}

function fetchSession(request: NextRequest) {
  return betterFetch<{
    user: BetterUser;
    session: Session;
  }>(apiRoutes.auth.getSession, {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function redirectToSignIn(request: NextRequest) {
  return NextResponse.redirect(new URL(routes.auth.signIn, request.url));
}

function redirectToHome(request: NextRequest) {
  return NextResponse.redirect(new URL(routes.home, request.url));
}
