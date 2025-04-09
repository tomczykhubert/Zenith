import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prismaSingleton";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/lib/auth/config";
import ID from "@/types/id";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONFIG.accessToken.name);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verify(token.value, process.env.JWT_SECRET!) as {
      userId: ID;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Authentication failed: ${error}` },
      { status: 401 }
    );
  }
}
