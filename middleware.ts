import { NextResponse, NextRequest } from "next/server";
import { PathHandler } from "./middleware/handlers/PathHandler";
import { AuthHandler } from "./middleware/handlers/AuthHandler";
import { LocaleHandler } from "./middleware/handlers/LocaleHandler";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PathHandler.isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (PathHandler.isApiPath(pathname)) {
    return AuthHandler.handleAuth(request);
  }

  if (LocaleHandler.isPathMissingLocale(pathname)) {
    return LocaleHandler.handleMissingLocale(request);
  }

  return AuthHandler.handleAuth(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
