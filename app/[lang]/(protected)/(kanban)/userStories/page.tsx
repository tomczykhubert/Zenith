"use client";
import CreateUserStoryForm from "@/components/features/userStory/forms/createUserStoryForm";
import UserStoriesGrid from "@/components/features/userStory/userStoriesGrid";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { routes } from "@/lib/routes/routes";
import { useSession } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

export default function UserStories() {
  const { t } = useDictionary();

  const { data, isPending } = useSession();
  const user = data?.user;
  const userStories: UserStory[] = useUsersStoretoriesStore(
    (state) => state.userStories
  );
  const activeProject = useProjectsStore((state) =>
    state.getProjectById(user!.activeProjectId!)
  );

  const breadcrumbItems = [
    {
      label: t("project.projects"),
      href: routes.projects.index,
    },
    {
      label: activeProject!.name,
    },
    {
      label: t("userStory.userStories"),
    },
  ];

  if (isPending) return <Spinner />;
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
