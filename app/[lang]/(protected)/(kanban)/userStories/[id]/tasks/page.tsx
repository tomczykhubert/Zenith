"use client";
import CreateTaskForm from "@/components/blocks/task/forms/createTaskForm";
import TasksGrid from "@/components/blocks/task/tasksGrid";
import Title from "@/components/blocks/common/title";
import ActionIcon from "@/components/ui/actionIcon";
import FormModal from "@/components/ui/modals/formModal";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useTasksStore } from "@/providers/tasksProvider";
import { routes } from "@/lib/routes/routes";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import Task from "@/types/task";
import ID from "@/types/id";
import UserStory from "@/types/userStory";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useDictionary();
  const userStory: UserStory | null = useUsersStoretoriesStore((state) =>
    state.getUserStoryById(id as ID)
  );

  const tasks: Task[] | null = useTasksStore((state) => state.tasks);

  if (!userStory) {
    return <p className="text-center mt-5">{t("userStory.notFound")}</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title
          title={t("task.tasks")}
          subtitle={userStory.name}
          backUrl={routes.userStories.list}
        />
        <ActionIcon
          Icon={MdAssignmentAdd}
          onClick={() => setIsModalOpen(true)}
          text={t("task.actions.create")}
        />
      </div>
      <TasksGrid tasks={tasks} />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header={t("task.actions.create")}
      >
        <CreateTaskForm
          userStoryId={id as ID}
          onClose={() => setIsModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
