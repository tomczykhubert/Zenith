import UserStory from "@/types/userStory";
import { UserStoriesRepository } from "@/repositories/userStoriesRepository";
import { createStore } from "zustand/vanilla";

export type UserStorySpecification = Partial<UserStory>;

export type UserStoriesState = {
  userStories: UserStory[];
};

export type UserStoriesActions = {
  addUserStory: (userStory: UserStory) => void;
  updateUserStory: (userStory: UserStory) => void;
  deleteUserStory: (id: string) => void;
  getUserStoryById: (id: string) => UserStory | null;
};

export type UserStoriesStore = UserStoriesState & UserStoriesActions;

export const defaultInitState: UserStoriesState = {
  userStories: [],
};

export const createUserStoriesStore = (
  initState: UserStoriesState = defaultInitState
) => {
  const userStoriesRepository = new UserStoriesRepository();

  return createStore<UserStoriesState & UserStoriesActions>((set, get) => ({
    ...initState,
    addUserStory: (userStory: UserStory) => {
      set((state) => {
        userStoriesRepository.create(userStory);
        return {
          userStories: [...state.userStories, userStory],
        };
      });
    },
    updateUserStory: (updatedUserStory: UserStory) => {
      set((state) => {
        userStoriesRepository.update(updatedUserStory);
        const updatedUserStories = state.userStories?.map((userStory) =>
          userStory.uid === updatedUserStory.uid ? updatedUserStory : userStory
        );
        return { ...state, userStories: updatedUserStories };
      });
    },
    deleteUserStory: (uid: string) => {
      set((state) => {
        userStoriesRepository.delete(uid);
        const updatedUserStories = state.userStories?.filter(
          (userStory) => userStory.uid !== uid
        );
        return { ...state, userStories: updatedUserStories };
      });
    },
    getUserStoryById: (uid: string) => {
      return (
        get().userStories.find((userStory) => userStory.uid === uid) ?? null
      );
    },
  }));
};
