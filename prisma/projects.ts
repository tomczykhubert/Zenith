import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";
import { Order, Specification } from "./base";
import ID from "@/types/id";

export async function createProject(project: Project): Promise<Project> {
  const createdProject = await prisma.project.create({
    data: project,
  });
  return createdProject;
}

export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects;
}

export async function getProjectsBySpecification(
  specification: Specification<Project>,
  order: Order<Project>,
  includeRelations: boolean = false
): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: specification,
    orderBy: order,
    include: includeRelations
      ? {
          userStories: true,
        }
      : undefined,
  });
  return projects;
}

export async function updateProject(
  id: ID,
  data: Partial<Project>
): Promise<Project> {
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data,
  });
  return updatedProject;
}

export async function deleteProject(id: ID): Promise<void> {
  await prisma.project.delete({
    where: {
      id,
    },
  });
}

export async function getProjectWithRelations(id: ID) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      userStories: true,
    },
  });
  return project;
}
