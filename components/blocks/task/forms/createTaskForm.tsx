"use client";

import { useTasksStore } from "@/providers/tasksProvider";
import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTaskFormProps {
  onClose: () => void;
  projectId: string;
  userId: string;
}

export default function CreateTaskForm({
  onClose,
  projectId,
  userId,
}: CreateTaskFormProps) {
  const addTask = useTasksStore((state) => state.addTask);

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const name = values.name;
    const description = values.description;
    const priority = values.priority;
    const status = values.status;
    const estimatedTime = values.estimatedTime;
    const projectId = values.projectId;
    const userId = values.userId;
    const userStoryId = values.userStoryId;
    addTask({
      name,
      description,
      priority,
      status,
      estimatedTime,
      projectId,
      userId,
      userStoryId,
    });

    onClose();
  };

  return (
    <>
      <TaskForm
        initialValues={{
          name: "",
          description: "",
          priority: TaskPriority.LOW,
          status: TaskStatus.PENDING,
          estimatedTime: 0,
          projectId: projectId,
          userId: userId,
          userStoryId: "",
        }}
        onSubmit={handleCreate}
      />
    </>
  );
}
