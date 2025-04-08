"use client";
import CreateUserStoryForm from "@/components/features/userStory/forms/createUserStoryForm";
import UserStoriesGrid from "@/components/features/userStory/userStoriesGrid";
import { useAuthStore } from "@/providers/authProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { routes } from "@/lib/routes/routes";

export default function UserStories() {
  const { t } = useDictionary();

  const user = useAuthStore((state) => state.user);
  const userStories: UserStory[] = useUsersStoretoriesStore(
    (state) => state.userStories
  );
  const activeProject = useProjectsStore((state) =>
    state.getProjectById(user!.activeProjectId!)
  );

  const breadcrumbItems = [
    {
      label: t("project.projects"),
      href: useLocalizedRoute(routes.projects.index),
    },
    {
      label: activeProject!.name,
    },
    {
      label: t("userStory.userStories"),
    },
  ];

  if (!activeProject) return;
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems}>
        <CreateUserStoryForm projectId={activeProject.id} ownerId={user!.id} />
      </PageBreadcrumb>
      <UserStoriesGrid userStories={userStories} />
    </>
  );
}
