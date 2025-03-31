"use client";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { routes } from "@/lib/routes/routes";
import { Direction } from "@/prisma/base";
import { useAuthStore } from "@/providers/authProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function UserStoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((state) => state.user);
  const projectsRoute = useLocalizedRoute(routes.projects.list);
  const { t } = useDictionary();

  useEffect(() => {
    if (!user?.activeProjectId) {
      toast.error(t("project.toast.needToSelectActiveProject"));
      redirect(projectsRoute);
    }
  }, [user?.activeProjectId, projectsRoute, t]);

  if (!user?.activeProjectId) return null;

  const specification = {
    projectId: user.activeProjectId,
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
