import { useMapEnumToSelect } from "@/lib/utils";
import { BaseDto } from "./base";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const useTaskSelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskPriority, "task.properties.priority");

export const useTaskSelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskStatus, "task.properties.status");

export default interface Task extends BaseDto {
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedTime: number;
  projectId: string;
  userId: string;
  userStoryId: string;
  startedAt: Date | null;
  completedAt: Date | null;
}
