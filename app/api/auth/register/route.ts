import { prisma } from "@/lib/prisma/prismaSingleton";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, displayName, role } = await req.json();
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        displayName,
        role,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...result } = user;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Registration failed: ${error}` },
      { status: 400 }
    );
  }
}
