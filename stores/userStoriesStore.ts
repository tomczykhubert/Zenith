import { apiRoutes } from "@/lib/routes/apiRoutes";
import UserStory from "@/types/userStory";
import { createStore } from "zustand/vanilla";

export type UserStorySpecification = Partial<UserStory>;

export type UserStoriesState = {
  userStories: UserStory[];
};

export type UserStoriesActions = {
  addUserStory: (
    userStory: Omit<UserStory, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateUserStory: (userStory: UserStory) => Promise<void>;
  deleteUserStory: (id: string) => Promise<void>;
  getUserStoryById: (id: string) => UserStory | null;
  fetchUserStories: () => Promise<void>;
};

export type UserStoriesStore = UserStoriesState & UserStoriesActions;

export const defaultInitState: UserStoriesState = {
  userStories: [],
};

export const createUserStoriesStore = (
  initState: UserStoriesState = defaultInitState
) => {
  return createStore<UserStoriesState & UserStoriesActions>((set, get) => ({
    ...initState,
    fetchUserStories: async () => {
      const response = await fetch(apiRoutes.userStories.base);
      if (!response.ok) throw new Error("Failed to fetch user stories");
      const userStories = await response.json();
      set({ userStories });
    },
    addUserStory: async (
      userStory: Omit<UserStory, "id" | "createdAt" | "updatedAt">
    ) => {
      const response = await fetch(apiRoutes.userStories.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userStory),
      });
      if (!response.ok) throw new Error("Failed to create user story");
      const newUserStory = await response.json();
      set((state) => ({
        userStories: [...state.userStories, newUserStory],
      }));
    },
    updateUserStory: async (updatedUserStory: UserStory) => {
      const response = await fetch(
        apiRoutes.userStories.byId(updatedUserStory.id),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserStory),
        }
      );
      if (!response.ok) throw new Error("Failed to update user story");
      const updated = await response.json();
      set((state) => ({
        userStories: state.userStories.map((userStory) =>
          userStory.id === updatedUserStory.id ? updated : userStory
        ),
      }));
    },
    deleteUserStory: async (id: string) => {
      const response = await fetch(apiRoutes.userStories.byId(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user story");
      set((state) => ({
        userStories: state.userStories.filter(
          (userStory) => userStory.id !== id
        ),
      }));
    },
    getUserStoryById: (id: string) => {
      return get().userStories.find((userStory) => userStory.id === id) ?? null;
    },
  }));
};
