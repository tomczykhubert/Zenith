"use client";

import { TasksStoreProvider } from "@/providers/tasksProvider";

import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { QuerySpecification } from "@/repositories/baseRepository";
import { useParams } from "next/navigation";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();
  const specification: QuerySpecification[] = [
    {
      field: "projectId",
      operator: "==",
      value: id,
    },
  ];
  return (
    <TasksStoreProvider specification={specification}>
      <UserStoriesStoreProvider specification={specification}>
        {children}
      </UserStoriesStoreProvider>
    </TasksStoreProvider>
  );
}
