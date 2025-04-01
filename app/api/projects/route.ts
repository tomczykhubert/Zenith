import { NextResponse } from "next/server";
import { Project } from "@prisma/client";
import {
  getProjectsBySpecification,
  createProject,
  getProjects,
} from "@/prisma/projects";
import { Order, Specification } from "@/prisma/base";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParams.get("specification")
      ? (JSON.parse(
          searchParams.get("specification") as string
        ) as Specification<Project>)
      : null;
    const order = searchParams.get("order")
      ? (JSON.parse(searchParams.get("order") as string) as Order<Project>)
      : null;
    if (!specification || !order) {
      const tasks = await getProjects();
      return NextResponse.json(tasks);
    }

    const projects = await getProjectsBySpecification(specification, order);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch projects: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const now = new Date();
    const projectData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as Project;
    const project = await createProject(projectData);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create project: ${error}` },
      { status: 400 }
    );
  }
}
