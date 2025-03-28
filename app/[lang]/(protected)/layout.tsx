"use client";

import { useAuthStore } from "@/providers/authProvider";
import { UsersProvider } from "@/providers/usersProvider";
import { routes } from "@/lib/routes/routes";
import { redirect } from "next/navigation";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const loginRoute = useLocalizedRoute(routes.user.signIn);
  if (!user) {
    redirect(loginRoute);
  }

  return <UsersProvider>{children}</UsersProvider>;
}
