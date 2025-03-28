import { NextResponse } from "next/server";
import {
  getUsersBySpecification,
  updateUser,
  deleteUser,
} from "@/prisma/users";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const users = await getUsersBySpecification({ id: params.id }, {}, true);
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch user: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updateData = {
      displayName: data.displayName,
      photoURL: data.photoURL,
      updatedAt: new Date(),
    };

    const { id } = await params;
    const user = await updateUser(id, updateData);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update user: ${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteUser(params.id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete user: ${error}` },
      { status: 400 }
    );
  }
}
