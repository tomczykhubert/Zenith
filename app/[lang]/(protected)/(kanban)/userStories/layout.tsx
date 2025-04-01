"use client";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { routes } from "@/lib/routes/routes";
import { Direction, Specification } from "@/lib/prisma/specification";
import { useAuthStore } from "@/providers/authProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import UserStory from "@/types/userStory";

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

  const specification: Specification<UserStory> = {
    where: {
      projectId: user.activeProjectId,
    },
    orderBy: {
      createdAt: Direction.DESC,
    },
  };

  return (
    <UserStoriesStoreProvider specification={specification}>
      {children}
    </UserStoriesStoreProvider>
  );
}
