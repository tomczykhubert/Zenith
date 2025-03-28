import { useMapEnumToSelect } from "@/lib/utils";
import { BaseDto } from "./base";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";

export const useUserStorySelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryPriority, "userStory.properties.priority");

export const useUserStorySelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryStatus, "userStory.properties.status");

export default interface UserStory extends BaseDto {
  name: string;
  description: string;
  priority: UserStoryPriority;
  status: UserStoryStatus;
  projectId: string;
  userId: string;
}
