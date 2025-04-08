"use client";

import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { useTasksStore } from "@/providers/tasksProvider";
import Task from "@/types/task";
import { toast } from "sonner";
import { useDictionary } from "@/providers/dictionaryProvider";
import UpdateFormProps from "@/types/props/updateFormProps";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuPencil } from "react-icons/lu";

type UpdateTaskFormProps = UpdateFormProps<Task>;

export default function UpdateTaskForm({ item: task }: UpdateTaskFormProps) {
  const { t } = useDictionary();
  const updateTask = useTasksStore((state) => state.updateTask);

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTask({
        ...task,
        name: values.name,
        description: values.description,
        priority: values.priority,
        estimatedTime: values.estimatedTime,
      });
      toast.success(t("task.toast.update.success"));
    } catch {
      toast.error(t("task.toast.update.failed"));
    }
  };

  return (
    <TaskForm
      initialValues={task}
      onSubmit={handleUpdate}
      trigger={
        <ActionButton
          variant="secondary"
          size="icon"
          tooltip={t("task.actions.edit")}
        >
          <LuPencil />
        </ActionButton>
      }
      title={t("task.actions.edit")}
    />
  );
}
