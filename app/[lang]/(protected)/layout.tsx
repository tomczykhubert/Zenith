"use client";

import { UsersProvider } from "@/providers/usersProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UsersProvider>
      <div className="mx-5 mt-5 mb-5">{children}</div>
    </UsersProvider>
  );
}
