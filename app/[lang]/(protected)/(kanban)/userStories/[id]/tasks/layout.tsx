"use client";

import { Direction } from "@/prisma/base";
import { TasksStoreProvider } from "@/providers/tasksProvider";
import ID from "@/types/id";
import { useParams } from "next/navigation";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  const specification = {
    userStoryId: id as ID,
  };

  const order = {
    createdAt: Direction.DESC,
  };

  return (
    <TasksStoreProvider specification={specification} order={order}>
      {children}
    </TasksStoreProvider>
  );
}
