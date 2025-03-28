import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import User from "@/types/user";
import { cookies } from "next/headers";
import { AUTH_CONFIG } from "@/lib/auth/config";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_CONFIG.accessToken.name);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verify(token.value, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = user as Omit<User, "password">;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Authentication failed: ${error}` },
      { status: 401 }
    );
  }
}
