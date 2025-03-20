import { useProjectsStore } from "@/providers/projectsProvider";
import { FaTrash, FaTasks, FaEdit, FaBook } from "react-icons/fa";
import { useState } from "react";
import FormModal from "@/components/ui/modals/formModal";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import Project from "@/types/project";
import { routes } from "@/utils/routes";
import ActionIcon from "@/components/ui/actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";
import { HoverCard } from "radix-ui";
export default function ProjectCard(project: Project) {
  const { t } = useDictionary();
  const deleteProject = useProjectsStore((state) => state.deleteProject);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    deleteProject(project.uid);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="bg-slate-700 border border-slate-700 shadow-md rounded-md p-4 min-h-[200px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-foreground truncate">
            {project.name}
          </h2>
          <div className="flex space-x-2">
            <ActionIcon
              href={routes.projectTasks(project.uid)}
              Icon={FaTasks}
              text={t("task.tasks")}
            />
            <ActionIcon
              variant="green"
              href={routes.projectUserStories(project.uid)}
              Icon={FaBook}
              text={t("userStory.userStories")}
            />
            <ActionIcon
              variant="blue"
              Icon={FaEdit}
              onClick={() => setIsUpdateModalOpen(true)}
              text={t("project.actions.edit")}
            />
            <ActionIcon
              variant="danger"
              Icon={FaTrash}
              onClick={() => setIsDeleteModalOpen(true)}
              text={t("project.actions.delete")}
            />
          </div>
        </div>
        <p
          className="text-muted-foreground truncate
"
        >
          {project.description}
        </p>
      </div>
      <ConfirmModal
        header={t("project.actions.delete")}
        message={t("project.actions.deleteConfirm")}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <FormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header={t("project.actions.edit")}
      >
        <UpdateProjectForm
          project={project}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      </FormModal>
    </div>
  );
}
