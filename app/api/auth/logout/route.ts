import { clearAuthCookies } from "@/lib/auth/utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Clearing cookies...");
    clearAuthCookies();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Logout failed: ${error}` },
      { status: 500 }
    );
  }
}
