"use client";

import { useTasksStore } from "@/providers/tasksProvider";
import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { TaskPriority, TaskStatus } from "@prisma/client";
import ID from "@/types/id";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";

interface CreateTaskFormProps {
  onClose: () => void;
  userStoryId: ID;
}

export default function CreateTaskForm({
  onClose,
  userStoryId,
}: CreateTaskFormProps) {
  const addTask = useTasksStore((state) => state.addTask);
  const { t } = useDictionary();

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    const name = values.name;
    const description = values.description;
    const priority = values.priority;
    const status = TaskStatus.PENDING;
    const estimatedTime = values.estimatedTime;
    try {
      await addTask({
        name,
        description,
        priority,
        status,
        estimatedTime,
        userStoryId,
      });

      toast.success(t("task.toast.create.success"));
    } catch {
      toast.error(t("task.toast.create.failed"));
    }
    onClose();
  };

  return (
    <>
      <TaskForm
        initialValues={{
          name: "",
          description: "",
          priority: TaskPriority.LOW,
          estimatedTime: 0,
        }}
        onSubmit={handleCreate}
      />
    </>
  );
}
