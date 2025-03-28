import prisma from "@/lib/prisma";
import { UserStory } from "@prisma/client";
import { Order, Specification } from "./base";

export async function createUserStory(
  userStory: UserStory
): Promise<UserStory> {
  const createdUserStory = await prisma.userStory.create({
    data: userStory,
  });
  return createdUserStory;
}

export async function getUserStories(): Promise<UserStory[]> {
  const userStories = await prisma.userStory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return userStories;
}

export async function getUserStoriesBySpecification(
  specification: Specification<UserStory>,
  order: Order<UserStory>,
  includeRelations: boolean = false
): Promise<UserStory[]> {
  const userStories = await prisma.userStory.findMany({
    orderBy: order,
    where: specification,
    include: includeRelations
      ? {
          project: true,
          user: true,
          tasks: true,
        }
      : undefined,
  });
  return userStories;
}

export async function updateUserStory(
  id: string,
  data: Partial<UserStory>
): Promise<UserStory> {
  const updatedUserStory = await prisma.userStory.update({
    where: { id },
    data,
  });
  return updatedUserStory;
}

export async function deleteUserStory(id: string): Promise<void> {
  await prisma.userStory.delete({
    where: { id },
  });
}
