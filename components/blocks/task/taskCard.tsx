import { useTasksStore } from "@/providers/tasksProvider";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import FormModal from "@/components/ui/modals/formModal";
import UpdateTaskForm from "./forms/updateTaskForm";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import Task from "@/types/task";
import ActionIcon from "@/components/ui/actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";
import { MdDone } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import AssignUserForm from "./forms/assignUserForm";
import { getEnumTranslationKey } from "@/lib/utils";
import { TaskStatus, UserRole } from "@prisma/client";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "react-toastify";
import { useAuthStore } from "@/providers/authProvider";
import BaseCard from "../baseCard";

export default function TaskCard(task: Task) {
  const { t } = useDictionary();
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isMarkAsCompletedModalOpen, setIsMarkAsCompletedModalOpen] =
    useState(false);
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user!);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success(t("task.toast.delete.success"));
    } catch {
      toast.error(t("task.toast.delete.failed"));
    }
    setIsDeleteModalOpen(false);
  };

  const handleMarkAsCompleted = async () => {
    try {
      await updateTask({
        ...task,
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
      });
      toast.success(t("task.toast.markAsCompleted.success"));
    } catch {
      toast.error(t("task.toast.markAsCompleted.failed"));
    }

    setIsMarkAsCompletedModalOpen(false);
  };

  const getUserById = useUsersStore((state) => state.getUserById);
  const assignedUser = task.assignedUserId
    ? getUserById(task.assignedUserId)
    : null;

  return (
    <>
      <BaseCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 ">
          <h2 className="text-xl font-bold text-foreground max-w-full order-2 sm:order-1">
            {task.name}
          </h2>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
            {task.status === TaskStatus.PENDING ? (
              <ActionIcon
                onClick={() => setIsAssignUserModalOpen(true)}
                Icon={FaUserClock}
                variant="lime"
                text={t("task.actions.assignUser")}
              />
            ) : null}
            {task.status === TaskStatus.IN_PROGRESS &&
            (task.assignedUserId === user.id ||
              user.role === UserRole.ADMIN) ? (
              <ActionIcon
                onClick={() => setIsMarkAsCompletedModalOpen(true)}
                Icon={MdDone}
                variant="lime"
                text={t("task.actions.markAsCompleted")}
              />
            ) : null}
            <ActionIcon
              onClick={() => setIsUpdateModalOpen(true)}
              Icon={FaEdit}
              variant="blue"
              text={t("task.actions.edit")}
            />
            <ActionIcon
              onClick={() => setIsDeleteModalOpen(true)}
              Icon={FaTrash}
              variant="danger"
              text={t("task.actions.delete")}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground ">{task.description}</p>
          <p className="text-muted-foreground">
            <strong>{t("task.properties.priority.priority")}:</strong>{" "}
            {t(
              getEnumTranslationKey(task.priority, "task.properties.priority")
            )}
          </p>
          <p className="text-muted-foreground">
            <strong>
              {t("task.properties.estimatedTime")} ({t("common.hours")}):
            </strong>{" "}
            {task.estimatedTime}
          </p>
          <p className="text-muted-foreground">
            <strong>{t("task.properties.assignedUser")}:</strong>{" "}
            {assignedUser ? assignedUser.displayName : "N/A"}
          </p>
          <p className="text-muted-foreground">
            <strong>{t("task.properties.startedAt")}:</strong>{" "}
            {task.startedAt ? new Date(task.startedAt).toLocaleString() : "N/A"}
          </p>
          <p className="text-muted-foreground">
            <strong>{t("task.properties.completedAt")}:</strong>{" "}
            {task.completedAt
              ? new Date(task.completedAt).toLocaleString()
              : "N/A"}
          </p>
          <p className="text-muted-foreground">
            <strong>{t("common.properties.createdAt")}:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-muted-foreground">
            <strong>{t("common.properties.updatedAt")}:</strong>{" "}
            {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </BaseCard>
      <ConfirmModal
        header={t("task.actions.delete")}
        message={t("task.actions.deleteConfirm")}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <ConfirmModal
        header={t("task.actions.markAsCompleted")}
        message={t("task.actions.markAsCompletedConfirm")}
        isOpen={isMarkAsCompletedModalOpen}
        onClose={() => setIsMarkAsCompletedModalOpen(false)}
        onConfirm={handleMarkAsCompleted}
      />
      <FormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header={t("task.actions.edit")}
      >
        <UpdateTaskForm
          task={task}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      </FormModal>
      <FormModal
        isOpen={isAssignUserModalOpen}
        onClose={() => setIsAssignUserModalOpen(false)}
        header={t("task.actions.assignUser")}
      >
        <AssignUserForm
          task={task}
          onClose={() => setIsAssignUserModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
