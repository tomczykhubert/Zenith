import { NextResponse, NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "../constants";

export class LocaleHandler {
  static isPathMissingLocale(pathname: string): boolean {
    return LOCALES.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
  }

  static getLocale(request: NextRequest): string {
    return this.isPathMissingLocale(request.nextUrl.pathname)
      ? DEFAULT_LOCALE
      : request.nextUrl.pathname.split("/")[1];
  }

  static handleMissingLocale(request: NextRequest): NextResponse {
    const locale = this.getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );
  }
}
