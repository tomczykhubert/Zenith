import { useMapEnumToSelect } from "@/lib/utils";

enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export const useTaskSelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskPriority, "task.properties.priority");

export const useTaskSelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskStatus, "task.properties.status");

export default interface Task {
  uid: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedTime: number;
  projectId: string;
  userId: string;
  userStoryId: string;
  createdAt: number;
  updatedAt: number | null;
  startedAt: number | null;
  completedAt: number | null;
}

export { TaskPriority, TaskStatus };
