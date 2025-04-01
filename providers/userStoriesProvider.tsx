"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import {
  UserStoriesState,
  UserStoriesStore,
  createUserStoriesStore,
} from "@/stores/userStoriesStore";
import Spinner from "@/components/shared/elements/spinner";
import { ProviderProps } from "./base";
import UserStory from "@/types/userStory";
import { apiRoutes } from "@/lib/routes/apiRoutes";

export type UserStoriesStoreApi = ReturnType<typeof createUserStoriesStore>;

export const UserStoriesStoreContext = createContext<
  UserStoriesStoreApi | undefined
>(undefined);

export const UserStoriesStoreProvider = ({
  children,
  specification,
  order,
}: ProviderProps<UserStory>) => {
  const [initialState, setInitialState] = useState<UserStoriesState>({
    userStories: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const params = new URLSearchParams();
        if (specification) {
          params.append("specification", JSON.stringify(specification));
        }
        if (order) {
          params.append("order", JSON.stringify(order));
        }

        const queryString = params.toString();
        const url = `${apiRoutes.userStories.base}${
          queryString ? `?${queryString}` : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch user stories");
        }
        const userStories = await response.json();
        setInitialState({ userStories });
      } catch (error) {
        console.error("Error fetching user stories:", error);
        setInitialState({ userStories: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialState();
  }, [specification, order]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <UserStoriesStoreContext.Provider
      value={createUserStoriesStore(initialState)}
    >
      {children}
    </UserStoriesStoreContext.Provider>
  );
};

export const useUsersStoretoriesStore = <T,>(
  selector: (store: UserStoriesStore) => T
): T => {
  const userStoriesStoreContext = useContext(UserStoriesStoreContext);

  if (!userStoriesStoreContext) {
    throw new Error(
      `useUsersStoretoriesStore must be used within UserStoriesStoreProvider`
    );
  }

  return useStore(userStoriesStoreContext, selector);
};
