import { useTasksStore } from "@/providers/tasksProvider";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import FormModal from "@/components/ui/modals/formModal";
import UpdateTaskForm from "./forms/updateTaskForm";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import Task from "@/types/task";
import ActionIcon from "@/components/ui/actionIcon";
import { useUserStoriesStore } from "@/providers/userStoriesProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { MdDone } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import AssignUserForm from "./forms/assignUserForm";
import { getEnumTranslationKey } from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import { useUsers } from "@/providers/usersProvider";
export default function TaskCard(task: Task) {
  const { t } = useDictionary();
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isMarkAsCompletedModalOpen, setIsMarkAsCompletedModalOpen] =
    useState(false);
  const [isAssignUserModalOpen, setIsAssignUserModalOpen] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setIsDeleteModalOpen(false);
  };

  const userStory = useUserStoriesStore((state) =>
    state.getUserStoryById(task.userStoryId)
  );

  const handleMarkAsCompleted = () => {
    updateTask({
      ...task,
      status: TaskStatus.COMPLETED,
      completedAt: new Date(),
    });
    setIsMarkAsCompletedModalOpen(false);
  };

  const { users } = useUsers((state) => ({
    users: state.users,
  }));
  const taskUser = users.find((user) => user.id === task.userId);
  return (
    <>
      <div className="relative bg-slate-700 border border-slate-700 shadow-md rounded-md p-4 min-h-[200px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-foreground">{task.name}</h2>
          <div className="space-x-2">
            <ActionIcon
              onClick={() => setIsMarkAsCompletedModalOpen(true)}
              Icon={MdDone}
              variant="lime"
              text={t("task.actions.markAsCompleted")}
            />
            <ActionIcon
              onClick={() => setIsAssignUserModalOpen(true)}
              Icon={FaUserClock}
              variant="green"
              text={t("task.actions.assignUser")}
            />
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
        <p className="text-muted-foreground mb-3">{task.description}</p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("task.properties.priority.priority")}:</strong>{" "}
          {t(getEnumTranslationKey(task.priority, "task.properties.priority"))}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("task.properties.status.status")}:</strong>{" "}
          {t(getEnumTranslationKey(task.status, "task.properties.status"))}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>
            {t("task.properties.estimatedTime")} ({t("common.hours")}):
          </strong>{" "}
          {task.estimatedTime}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("user.user")}:</strong>{" "}
          {taskUser ? taskUser.displayName : "N/A"}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("userStory.userStory")}:</strong>{" "}
          {userStory ? userStory.name : "N/A"}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("common.properties.createdAt")}:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("common.properties.updatedAt")}:</strong>{" "}
          {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("task.properties.startedAt")}:</strong>{" "}
          {task.startedAt ? new Date(task.startedAt).toLocaleString() : "N/A"}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("task.properties.completedAt")}:</strong>{" "}
          {task.completedAt
            ? new Date(task.completedAt).toLocaleString()
            : "N/A"}
        </p>
      </div>
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
