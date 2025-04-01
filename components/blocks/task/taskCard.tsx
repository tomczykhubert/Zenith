import { useTasksStore } from "@/providers/tasksProvider";
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
import { formatDate } from "@/lib/utils/dateFormat";
import BaseCard from "../common/baseCard";

export default function TaskCard(task: Task) {
  const { t } = useDictionary();
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const [isMarkAsCompletedModalOpen, setIsMarkAsCompletedModalOpen] =
    useState(false);
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user!);
  const getUserById = useUsersStore((state) => state.getUserById);
  const assignedUser = task.assignedUserId
    ? getUserById(task.assignedUserId)
    : null;

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success(t("task.toast.delete.success"));
    } catch {
      toast.error(t("task.toast.delete.failed"));
    }
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

  const additionalActions = (
    <>
      {task.status === TaskStatus.PENDING && (
        <ActionIcon
          onClick={() => setIsAssignUserModalOpen(true)}
          Icon={FaUserClock}
          variant="lime"
          text={t("task.actions.assignUser")}
        />
      )}
      {task.status === TaskStatus.IN_PROGRESS &&
        (task.assignedUserId === user.id || user.role === UserRole.ADMIN) && (
          <ActionIcon
            onClick={() => setIsMarkAsCompletedModalOpen(true)}
            Icon={MdDone}
            variant="lime"
            text={t("task.actions.markAsCompleted")}
          />
        )}
    </>
  );

  const additionalProperties = (
    <>
      <p className="text-muted-foreground">
        <strong>{t("task.properties.priority.priority")}:</strong>{" "}
        {t(getEnumTranslationKey(task.priority, "task.properties.priority"))}
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
        {formatDate(task.startedAt)}
      </p>
      <p className="text-muted-foreground">
        <strong>{t("task.properties.completedAt")}:</strong>{" "}
        {formatDate(task.completedAt)}
      </p>
    </>
  );

  const additionalModals = (
    <>
      <ConfirmModal
        header={t("task.actions.markAsCompleted")}
        message={t("task.actions.markAsCompletedConfirm")}
        isOpen={isMarkAsCompletedModalOpen}
        onClose={() => setIsMarkAsCompletedModalOpen(false)}
        onConfirm={handleMarkAsCompleted}
      />
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

  return (
    <BaseCard
      item={task}
      onDelete={handleDelete}
      t={t}
      additionalActions={additionalActions}
      additionalProperties={additionalProperties}
      additionalModals={additionalModals}
      UpdateFormComponent={UpdateTaskForm}
      translations={{
        edit: "task.actions.edit",
        delete: "task.actions.delete",
        deleteConfirm: "task.actions.deleteConfirm",
      }}
    />
  );
}
