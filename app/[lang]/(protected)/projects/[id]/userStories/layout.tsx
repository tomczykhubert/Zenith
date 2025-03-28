"use client";
import { Direction } from "@/prisma/base";
import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { useParams } from "next/navigation";

export default function UserStoriesLayout({
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
    <UserStoriesStoreProvider specification={specification} order={order}>
      {children}
    </UserStoriesStoreProvider>
  );
}
