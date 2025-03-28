"use client";

import { Direction } from "@/prisma/base";
import { TasksStoreProvider } from "@/providers/tasksProvider";

import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { useParams } from "next/navigation";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  const specification = {
    projectId: id as string,
  };

  const order = {
    createdAt: Direction.DESC,
  };

  return (
    <TasksStoreProvider specification={specification} order={order}>
      <UserStoriesStoreProvider specification={specification} order={order}>
        {children}
      </UserStoriesStoreProvider>
    </TasksStoreProvider>
  );
}
