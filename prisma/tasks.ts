import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { Order, Specification } from "./base";
import ID from "@/types/id";

export async function createTask(task: Task): Promise<Task> {
  const createdTask = await prisma.task.create({
    data: task,
  });
  return createdTask;
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks;
}

export async function getTasksBySpecification(
  specification: Specification<Task>,
  order: Order<Task>,
  includeRelations: boolean = false
): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    orderBy: order,
    where: specification,
    include: includeRelations
      ? {
          assignedUser: true,
          userStory: true,
        }
      : undefined,
  });
  return tasks;
}

export async function updateTask(id: ID, data: Partial<Task>): Promise<Task> {
  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });
  return updatedTask;
}

export async function deleteTask(id: ID): Promise<void> {
  await prisma.task.delete({
    where: { id },
  });
}
