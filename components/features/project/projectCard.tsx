import { useProjectsStore } from "@/providers/projectsProvider";
import { FaRegCheckSquare, FaCheckSquare } from "react-icons/fa";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Project from "@/types/project";
import { useDictionary } from "@/providers/dictionaryProvider";
import { toast } from "sonner";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";
import { useSession, updateUser } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

export default function ProjectCard(project: Project) {
  const { t } = useDictionary();
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const { data, isPending } = useSession();
  const user = data?.user;

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      toast.success(t("project.toast.delete.success"));
    } catch {
      toast.error(t("project.toast.delete.failed"));
    }
  };

  const handleSetActiveProject = async () => {
    try {
      const { error } = await updateUser({
        activeProjectId: project.id,
      });
      if (error) {
        throw error;
      }
      toast.success(t("project.toast.setActive.success"));
    } catch {
      toast.error(t("project.toast.setActive.failed"));
    }
  };

  const handleUnsetActiveProject = async () => {
    try {
      const { error } = await updateUser({
        activeProjectId: null,
      });
      if (error) {
        throw error;
      }
      toast.success(t("project.toast.unsetActive.success"));
    } catch {
      toast.error(t("project.toast.unsetActive.failed"));
    }
  };
  const additionalActions = (
    <>
      {user?.activeProjectId == project.id ? (
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
  if (isPending) return <Spinner />;
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
