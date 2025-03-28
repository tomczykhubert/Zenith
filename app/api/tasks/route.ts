import { NextResponse } from "next/server";
import { getTasks, createTask, getTasksBySpecification } from "@/prisma/tasks";
import { Task } from "@prisma/client";
import { Order, Specification } from "@/prisma/base";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParams.get("specification")
      ? (JSON.parse(
          searchParams.get("specification") as string
        ) as Specification<Task>)
      : null;
    const order = searchParams.get("order")
      ? (JSON.parse(searchParams.get("order") as string) as Order<Task>)
      : null;
    if (!specification || !order) {
      const tasks = await getTasks();
      return NextResponse.json(tasks);
    }

    const tasks = await getTasksBySpecification(specification, order);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tasks: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const now = new Date();
    const taskData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as Task;
    const task = await createTask(taskData);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create task: ${error}` },
      { status: 400 }
    );
  }
}
