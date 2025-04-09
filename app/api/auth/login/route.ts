import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma/prismaSingleton";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import User from "@/types/user";
import { setAuthCookies } from "@/lib/auth/utils";
import { AUTH_CONFIG } from "@/lib/auth/config";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: `${AUTH_CONFIG.accessToken.maxAge}s`,
    });

    const refreshToken = sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: `${AUTH_CONFIG.refreshToken.maxAge}s` }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + AUTH_CONFIG.refreshToken.maxAge * 1000
        ),
      },
    });

    const response = await setAuthCookies(token, refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;

    return NextResponse.json(user as User, {
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Login failed: ${error}` },
      { status: 500 }
    );
  }
}
