import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import User from "@/types/user";

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

    const result = user as Omit<User, "password">;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Registration failed: ${error}` },
      { status: 400 }
    );
  }
}
