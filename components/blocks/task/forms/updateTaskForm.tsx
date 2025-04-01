"use client";

import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { useTasksStore } from "@/providers/tasksProvider";
import Task from "@/types/task";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";
import UpdateFormProps from "@/types/forms/updateFormProps";

type UpdateTaskFormProps = UpdateFormProps<Task>;

export default function UpdateTaskForm({
  onSubmit,
  item: task,
}: UpdateTaskFormProps) {
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
    onSubmit();
  };

  return (
    <>
      <TaskForm
        initialValues={{
          ...task,
        }}
        onSubmit={handleUpdate}
      />
    </>
  );
}
