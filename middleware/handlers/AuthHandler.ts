import { NextResponse, NextRequest } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import { routes } from "@/lib/routes/routes";
import { PathHandler } from "./PathHandler";
import { LocaleHandler } from "./LocaleHandler";

export class AuthHandler {
  static async handleAuth(request: NextRequest): Promise<NextResponse> {
    const token = request.cookies.get(AUTH_CONFIG.accessToken.name);
    if (!token) {
      return this.handleUnauthorized(request);
    }

    try {
      return NextResponse.next();
    } catch {
      return this.handleTokenRefresh(request);
    }
  }

  static async handleTokenRefresh(request: NextRequest): Promise<NextResponse> {
    const refreshToken = request.cookies.get(AUTH_CONFIG.refreshToken.name);
    if (!refreshToken) {
      return this.handleUnauthorized(request);
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

      return response.ok
        ? NextResponse.next()
        : this.handleUnauthorized(request);
    } catch {
      return this.handleUnauthorized(request);
    }
  }

  static handleUnauthorized(request: NextRequest): NextResponse {
    if (PathHandler.isApiPath(request.nextUrl.pathname)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locale = LocaleHandler.getLocale(request);
    const callbackUrl = encodeURIComponent(
      request.nextUrl.pathname + request.nextUrl.search
    );
    const signInUrl = `/${locale}${routes.user.signIn}?callbackUrl=${callbackUrl}`;

    return NextResponse.redirect(new URL(signInUrl, request.url));
  }
}
