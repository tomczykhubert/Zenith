import { NextResponse } from "next/server";
import {
  getTasksBySpecification,
  updateTask,
  deleteTask,
} from "@/prisma/tasks";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const tasks = await getTasksBySpecification({ id: params.id }, {}, true);
    const task = tasks[0];

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch task: ${error}` },
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
      ...data,
      updatedAt: new Date(),
    };
    const task = await updateTask(params.id, updateData);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update task: ${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTask(params.id);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete task: ${error}` },
      { status: 400 }
    );
  }
}
