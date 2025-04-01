import { useProjectsStore } from "@/providers/projectsProvider";
import { FaRegCheckSquare, FaCheckSquare } from "react-icons/fa";
import { useState } from "react";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Project from "@/types/project";
import ActionIcon from "@/components/shared/elements/actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useAuthStore } from "@/providers/authProvider";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "react-toastify";
import BaseCard from "../../shared/base/baseCard";

export default function ProjectCard(project: Project) {
  const { t } = useDictionary();
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const user = useAuthStore((state) => state.user!);
  const updateUser = useUsersStore((state) => state.updateUser);
  const updateAuthUser = useAuthStore((state) => state.updateCurrentUser);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    header: "",
    message: "",
    action: () => {},
  });

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      toast.success(t("project.toast.delete.success"));
    } catch {
      toast.error(t("project.toast.delete.failed"));
    }
    setConfirmModal({ ...confirmModal, open: false });
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
    setConfirmModal({ ...confirmModal, open: false });
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
    setConfirmModal({ ...confirmModal, open: false });
  };
  const additionalActions = (
    <>
      {user.activeProjectId == project.id ? (
        <ActionIcon
          variant="lime"
          Icon={FaCheckSquare}
          onClick={() =>
            setConfirmModal({
              header: "project.actions.unsetActive",
              message: "project.actions.unsetActiveConfirm",
              open: true,
              action: handleUnsetActiveProject,
            })
          }
          text={t("project.actions.unsetActive")}
        />
      ) : (
        <ActionIcon
          variant="lime"
          Icon={FaRegCheckSquare}
          onClick={() =>
            setConfirmModal({
              header: "project.actions.setActive",
              message: "project.actions.setActiveConfirm",
              open: true,
              action: handleSetActiveProject,
            })
          }
          text={t("project.actions.setActive")}
        />
      )}
    </>
  );

  const additionalModals = (
    <ConfirmModal
      header={t(confirmModal.header)}
      message={t(confirmModal.message)}
      isOpen={confirmModal.open}
      onClose={() => setConfirmModal({ ...confirmModal, open: false })}
      onConfirm={confirmModal.action}
    />
  );

  return (
    <BaseCard<Project>
      item={project}
      onDelete={handleDelete}
      t={t}
      additionalActions={additionalActions}
      additionalModals={additionalModals}
      UpdateFormComponent={UpdateProjectForm}
      translations={{
        edit: "project.actions.edit",
        delete: "project.actions.delete",
        deleteConfirm: "project.actions.deleteConfirm",
      }}
    />
  );
}
