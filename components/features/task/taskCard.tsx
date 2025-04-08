import { useTasksStore } from "@/providers/tasksProvider";
import UpdateTaskForm from "./forms/updateTaskForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Task from "@/types/task";
import { useDictionary } from "@/providers/dictionaryProvider";
import { MdDone } from "react-icons/md";
import AssignUserForm from "./forms/assignUserForm";
import { getEnumTranslationKey } from "@/lib/utils/enums";
import { TaskStatus, UserRole } from "@prisma/client";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "sonner";
import { useAuthStore } from "@/providers/authProvider";
import { formatDate } from "@/lib/utils/dateFormat";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";

export default function TaskCard(task: Task) {
  const { t } = useDictionary();
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
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
  };

  const additionalActions = (
    <>
      {task.status === TaskStatus.PENDING && <AssignUserForm task={task} />}
      {task.status === TaskStatus.IN_PROGRESS &&
        (task.assignedUserId === user.id || user.role === UserRole.ADMIN) && (
          <ConfirmModal
            header={t("task.actions.markAsCompleted")}
            message={t("task.actions.markAsCompletedConfirm")}
            onConfirm={handleMarkAsCompleted}
            trigger={
              <ActionButton
                variant="default"
                size="icon"
                tooltip={t("task.actions.markAsCompleted")}
              >
                <MdDone />
              </ActionButton>
            }
          />
        )}
    </>
  );

  const additionalProperties = (
    <>
      <p>
        <strong>{t("task.properties.priority.priority")}:</strong>{" "}
        {t(getEnumTranslationKey(task.priority, "task.properties.priority"))}
      </p>
      <p>
        <strong>
          {t("task.properties.estimatedTime")} ({t("common.hours")}):
        </strong>{" "}
        {task.estimatedTime}
      </p>
      <p>
        <strong>{t("task.properties.assignedUser")}:</strong>{" "}
        {assignedUser ? assignedUser.displayName : "N/A"}
      </p>
      <p>
        <strong>{t("task.properties.startedAt")}:</strong>{" "}
        {formatDate(task.startedAt)}
      </p>
      <p>
        <strong>{t("task.properties.completedAt")}:</strong>{" "}
        {formatDate(task.completedAt)}
      </p>
    </>
  );

  return (
    <BaseCard<Task>
      item={task}
      onDelete={handleDelete}
      t={t}
      additionalActions={additionalActions}
      additionalProperties={additionalProperties}
      UpdateFormComponent={UpdateTaskForm}
      translations={{
        edit: "task.actions.edit",
        delete: "task.actions.delete",
        deleteConfirm: "task.actions.deleteConfirm",
      }}
    />
  );
}
