import { NextResponse } from "next/server";
import { sign, verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma/prismaSingleton";
import { cookies } from "next/headers";
import { setAuthCookies } from "@/lib/auth/utils";
import ID from "@/types/id";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const decoded = verify(
      refreshToken.value,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: ID };

    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken.value,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!storedToken) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const newToken = sign({ userId: decoded.userId }, process.env.JWT_SECRET!);

    return await setAuthCookies(newToken, refreshToken.value);
  } catch (error) {
    return NextResponse.json(
      { error: `Token refresh failed: ${error}` },
      { status: 401 }
    );
  }
}
