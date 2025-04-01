import { NextResponse } from "next/server";
import {
  getUserStories,
  createUserStory,
  getUserStoriesBySpecification,
} from "@/prisma/userStories";
import { UserStory } from "@prisma/client";
import { Order, Specification } from "@/prisma/base";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParams.get("specification")
      ? (JSON.parse(
          searchParams.get("specification") as string
        ) as Specification<UserStory>)
      : null;
    const order = searchParams.get("order")
      ? (JSON.parse(searchParams.get("order") as string) as Order<UserStory>)
      : null;
    if (!specification || !order) {
      const userStories = await getUserStories();
      return NextResponse.json(userStories);
    }

    const userStories = await getUserStoriesBySpecification(
      specification,
      order
    );
    return NextResponse.json(userStories);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch user stories: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const now = new Date();
    const userStoryData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as UserStory;
    const userStory = await createUserStory(userStoryData);
    return NextResponse.json(userStory);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create user story: ${error}` },
      { status: 400 }
    );
  }
}
