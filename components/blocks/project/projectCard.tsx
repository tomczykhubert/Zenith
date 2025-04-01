import { useProjectsStore } from "@/providers/projectsProvider";
import {
  FaTrash,
  FaEdit,
  FaRegCheckSquare,
  FaCheckSquare,
} from "react-icons/fa";
import { useState } from "react";
import FormModal from "@/components/ui/modals/formModal";
import UpdateProjectForm from "./forms/updateProjectForm";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import Project from "@/types/project";
import ActionIcon from "@/components/ui/actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useAuthStore } from "@/providers/authProvider";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "react-toastify";
import BaseCard from "../baseCard";

export default function ProjectCard(project: Project) {
  const { t } = useDictionary();
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  const user = useAuthStore((state) => state.user);
  const updateUser = useUsersStore((state) => state.updateUser);
  const updateAuthUser = useAuthStore((state) => state.updateCurrentUser);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    header: "",
    message: "",
    action: () => {},
  });

  if (!user) throw new Error("Not authenticated");

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
  return (
    <div>
      <BaseCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
          <h2 className="text-xl font-bold text-foreground max-w-full order-2 sm:order-1">
            {project.name}
          </h2>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
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
            <ActionIcon
              variant="blue"
              Icon={FaEdit}
              onClick={() => setIsUpdateModalOpen(true)}
              text={t("project.actions.edit")}
            />
            <ActionIcon
              variant="danger"
              Icon={FaTrash}
              onClick={() =>
                setConfirmModal({
                  header: "project.actions.delete",
                  message: "project.actions.deleteConfirm",
                  open: true,
                  action: handleDelete,
                })
              }
              text={t("project.actions.delete")}
            />
          </div>
        </div>
        <p className="text-muted-foreground">{project.description}</p>
      </BaseCard>
      <ConfirmModal
        header={t(confirmModal.header)}
        message={t(confirmModal.message)}
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ ...confirmModal, open: false })}
        onConfirm={confirmModal.action}
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
