import { LOCALES } from "../constants";
import { PUBLIC_PATHS } from "@/lib/auth/config";

export class PathHandler {
  static isPublicPath(pathname: string): boolean {
    if (LOCALES.some((locale) => pathname === `/${locale}`)) {
      return true;
    }

    const pathWithoutLocale = LOCALES.some((locale) =>
      pathname.startsWith(`/${locale}/`)
    )
      ? pathname.split("/").slice(2).join("/")
      : pathname;

    return (
      pathname.startsWith("/_next") ||
      pathname.includes(".") ||
      PUBLIC_PATHS.includes(pathWithoutLocale) ||
      PUBLIC_PATHS.includes(`/${pathWithoutLocale}`)
    );
  }

  static isApiPath(pathname: string): boolean {
    return pathname.startsWith("/api/");
  }
}
