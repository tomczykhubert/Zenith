import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { Order, Specification } from "./base";

export async function createUser(user: User): Promise<User> {
  const createdUser = await prisma.user.create({
    data: user,
  });
  return createdUser;
}

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
}

export async function getUsersBySpecification(
  specification: Specification<User>,
  order: Order<User>,
  includeRelations: boolean = false
): Promise<User[]> {
  const users = await prisma.user.findMany({
    orderBy: order,
    where: specification,
    include: includeRelations
      ? {
          tasks: true,
          userStories: true,
        }
      : undefined,
  });
  return users;
}

export async function updateUser(
  id: string,
  data: Partial<User>
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({
    where: { id },
  });
}
