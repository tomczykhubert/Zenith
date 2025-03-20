import { useMapEnumToSelect } from "@/lib/utils";

enum UserStoryPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

enum UserStoryStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
export const useUserStorySelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryPriority, "userStory.properties.priority");

export const useUserStorySelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryStatus, "userStory.properties.status");

export default interface UserStory {
  uid: string;
  name: string;
  description: string;
  priority: UserStoryPriority;
  status: UserStoryStatus;
  projectId: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export { UserStoryPriority, UserStoryStatus };
