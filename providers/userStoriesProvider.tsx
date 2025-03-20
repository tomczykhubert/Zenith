"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

import {
  UserStoriesState,
  UserStoriesStore,
  createUserStoriesStore,
} from "@/stores/userStoriesStore";
import { UserStoriesRepository } from "@/repositories/userStoriesRepository";
import Spinner from "@/components/blocks/spinner";
import { QuerySpecification } from "@/repositories/baseRepository";

export type UserStoriesStoreApi = ReturnType<typeof createUserStoriesStore>;

export const UserStoriesStoreContext = createContext<
  UserStoriesStoreApi | undefined
>(undefined);

export interface UserStoriesStoreProviderProps {
  children: ReactNode;
  specification?: QuerySpecification[];
}

export const UserStoriesStoreProvider = ({
  children,
  specification,
}: UserStoriesStoreProviderProps) => {
  const [initialState, setInitialState] = useState<UserStoriesState>({
    userStories: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const userStoriesRepository = new UserStoriesRepository();
        const userStories = specification
          ? await userStoriesRepository.getBySpecification(specification)
          : await userStoriesRepository.get();
        setInitialState({ userStories });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialState();
  }, [specification]);

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

export const useUserStoriesStore = <T,>(
  selector: (store: UserStoriesStore) => T
): T => {
  const userStoriesStoreContext = useContext(UserStoriesStoreContext);

  if (!userStoriesStoreContext) {
    throw new Error(
      `useUserStoriesStore must be used within UserStoriesStoreProvider`
    );
  }

  return useStore(userStoriesStoreContext, selector);
};
