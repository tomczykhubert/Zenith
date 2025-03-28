import { clearAuthCookies } from "@/lib/auth/utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.delete("token");
    response.cookies.delete("refreshToken");

    await clearAuthCookies();

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Logout failed: ${error}` },
      { status: 500 }
    );
  }
}
