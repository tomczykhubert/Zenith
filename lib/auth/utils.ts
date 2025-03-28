import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "./config";

export async function setAuthCookies(token: string, refreshToken: string) {
  const response = NextResponse.json({ success: true });

  response.cookies.set(AUTH_CONFIG.accessToken.name, token, {
    ...AUTH_CONFIG.cookies,
    maxAge: AUTH_CONFIG.accessToken.maxAge,
  });

  response.cookies.set(AUTH_CONFIG.refreshToken.name, refreshToken, {
    ...AUTH_CONFIG.cookies,
    maxAge: AUTH_CONFIG.refreshToken.maxAge,
  });

  return response;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.accessToken.name);
  cookieStore.delete(AUTH_CONFIG.refreshToken.name);
}
