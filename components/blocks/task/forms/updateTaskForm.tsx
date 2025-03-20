"use client";

import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { useTasksStore } from "@/providers/tasksProvider";
import Task from "@/types/task";

interface UpdateTaskFormProps {
  onClose: () => void;
  task: Task;
}

export default function UpdateTaskForm({ onClose, task }: UpdateTaskFormProps) {
  const updateTask = useTasksStore((state) => state.updateTask);
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateTask({
      ...task,
      name: values.name,
      description: values.description,
      priority: values.priority,
      status: values.status,
      estimatedTime: values.estimatedTime,
      userId: values.userId,
      userStoryId: values.userStoryId,
      updatedAt: Date.now(),
    });
    onClose();
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
