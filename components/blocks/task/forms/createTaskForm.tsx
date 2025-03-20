"use client";

import { useTasksStore } from "@/providers/tasksProvider";
import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { TaskPriority, TaskStatus } from "@/types/task";
import { collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
    const userStoryId = values.userStoryId;

    addTask({
      uid: doc(collection(db, "projects")).id,
      name,
      description,
      priority,
      status,
      estimatedTime,
      projectId,
      userId,
      userStoryId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startedAt: null,
      completedAt: null,
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
