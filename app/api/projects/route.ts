import { NextResponse } from "next/server";
import { Project } from "@prisma/client";
import { getProjectsBySpecification, createProject } from "@/prisma/projects";
import { Order } from "@/prisma/base";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderField =
      (searchParams.get("orderBy") as keyof Project) || "createdAt";
    const orderDirection =
      (searchParams.get("direction") as "asc" | "desc") || "desc";

    const order: Order<Project> = {
      [orderField]: orderDirection,
    };

    const projects = await getProjectsBySpecification({}, order, true);
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
