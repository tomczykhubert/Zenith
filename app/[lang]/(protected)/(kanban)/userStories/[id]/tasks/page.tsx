"use client";

import CreateTaskForm from "@/components/features/task/forms/createTaskForm";
import TasksGrid from "@/components/features/task/tasksGrid";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useTasksStore } from "@/providers/tasksProvider";
import { routes } from "@/lib/routes/routes";
import { useParams } from "next/navigation";
import Task from "@/types/task";
import ID from "@/types/id";
import UserStory from "@/types/userStory";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import ActionButton from "@/components/shared/elements/actionButton";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useProjectsStore } from "@/providers/projectsProvider";
import { LuClipboardPen } from "react-icons/lu";
import { useSession } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

export default function Tasks() {
  const { id } = useParams();
  const { t } = useDictionary();
  const userStory: UserStory | null = useUsersStoretoriesStore((state) =>
    state.getUserStoryById(id as ID)
  );
  const tasks: Task[] | null = useTasksStore((state) => state.tasks);
  const { data, isPending } = useSession();
  const user = data?.user;
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
      href: routes.userStories.index,
    },
    {
      label: userStory!.name,
    },
    {
      label: t("task.tasks"),
    },
  ];

  if (!userStory) {
    return <p className="text-center mt-5">{t("userStory.notFound")}</p>;
  }
  if (isPending) return <Spinner />;
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems}>
        <CreateTaskForm
          userStoryId={id as ID}
          trigger={
            <ActionButton tooltip={t("task.actions.create")} size="icon">
              <LuClipboardPen />
            </ActionButton>
          }
        />
      </PageBreadcrumb>
      <TasksGrid tasks={tasks} />
    </>
  );
}
