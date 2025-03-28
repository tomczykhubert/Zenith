"use client";
import CreateTaskForm from "@/components/blocks/task/forms/createTaskForm";
import TasksGrid from "@/components/blocks/task/tasksGrid";
import Title from "@/components/blocks/title";
import ActionIcon from "@/components/ui/actionIcon";
import FormModal from "@/components/ui/modals/formModal";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useTasksStore } from "@/providers/tasksProvider";
import Project from "@/types/project";
import { routes } from "@/lib/routes/routes";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import Task from "@/types/task";
export default function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useDictionary();
  const project: Project | null = useProjectsStore((state) =>
    state.getProjectById(id?.toString() || "")
  );
  const tasks: Task[] | null = useTasksStore((state) => state.tasks);

  if (!project) {
    return <p className="text-center mt-5">{t("project.notFound")}</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title
          title={t("task.tasks")}
          subtitle={project.name}
          backUrl={routes.projects.list}
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
          projectId={id?.toString() || ""}
          userId=""
          onClose={() => setIsModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
