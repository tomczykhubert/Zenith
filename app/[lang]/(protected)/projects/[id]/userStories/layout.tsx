"use client";

import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { QuerySpecification } from "@/repositories/baseRepository";
import { useParams } from "next/navigation";

export default function UserStoriesLayout({
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
    <UserStoriesStoreProvider specification={specification}>
      {children}
    </UserStoriesStoreProvider>
  );
}
