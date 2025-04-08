import { useProjectsStore } from "@/providers/projectsProvider";
import { FaRegCheckSquare, FaCheckSquare } from "react-icons/fa";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Project from "@/types/project";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useAuthStore } from "@/providers/authProvider";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "sonner";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";

export default function ProjectCard(project: Project) {
  const { t } = useDictionary();
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const user = useAuthStore((state) => state.user!);
  const updateUser = useUsersStore((state) => state.updateUser);
  const updateAuthUser = useAuthStore((state) => state.updateCurrentUser);

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      toast.success(t("project.toast.delete.success"));
    } catch {
      toast.error(t("project.toast.delete.failed"));
    }
  };

  const handleSetActiveProject = async () => {
    const updatedUser = {
      ...user,
      activeProjectId: project.id,
    };
    try {
      await updateUser(updatedUser);
      updateAuthUser(updatedUser);
      toast.success(t("project.toast.setActive.success"));
    } catch {
      toast.error(t("project.toast.setActive.failed"));
    }
  };

  const handleUnsetActiveProject = async () => {
    const updatedUser = {
      ...user,
      activeProjectId: null,
    };
    try {
      await updateUser(updatedUser);
      updateAuthUser(updatedUser);
      toast.success(t("project.toast.unsetActive.success"));
    } catch {
      toast.error(t("project.toast.unsetActive.failed"));
    }
  };
  const additionalActions = (
    <>
      {user.activeProjectId == project.id ? (
        <ConfirmModal
          header={t("project.actions.unsetActive")}
          message={t("project.actions.unsetActiveConfirm")}
          onConfirm={handleUnsetActiveProject}
          trigger={
            <ActionButton
              variant="default"
              size="icon"
              tooltip={t("project.actions.unsetActive")}
            >
              <FaCheckSquare />
            </ActionButton>
          }
        />
      ) : (
        <ConfirmModal
          header={t("project.actions.setActive")}
          message={t("project.actions.setActiveConfirm")}
          onConfirm={handleSetActiveProject}
          trigger={
            <ActionButton
              variant="default"
              size="icon"
              tooltip={t("project.actions.setActive")}
            >
              <FaRegCheckSquare />
            </ActionButton>
          }
        />
      )}
    </>
  );

  return (
    <BaseCard<Project>
      item={project}
      onDelete={handleDelete}
      t={t}
      additionalActions={additionalActions}
      UpdateFormComponent={UpdateProjectForm}
      translations={{
        edit: "project.actions.edit",
        delete: "project.actions.delete",
        deleteConfirm: "project.actions.deleteConfirm",
      }}
    />
  );
}
