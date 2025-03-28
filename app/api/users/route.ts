import { NextResponse } from "next/server";
import { getUsersBySpecification } from "@/prisma/users";
import { User } from "@prisma/client";
import { Order } from "@/prisma/base";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderField =
      (searchParams.get("orderBy") as keyof User) || "createdAt";
    const orderDirection =
      (searchParams.get("direction") as "asc" | "desc") || "desc";

    const order: Order<User> = {
      [orderField]: orderDirection,
    };

    const users = await getUsersBySpecification({}, order, true);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users: ${error}` },
      { status: 500 }
    );
  }
}
