"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";
import { createUserStore, UserState, UserStore } from "@/stores/userStore";
import { UsersRepository } from "@/repositories/usersRepository";
import Spinner from "@/components/blocks/spinner";
import { auth } from "@/lib/firebase";
import { UserRole } from "@/types/user";
import { QuerySpecification } from "@/repositories/baseRepository";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export interface UserStoreProviderProps {
  children: ReactNode;
  specification?: QuerySpecification[];
}

export const UserStoreProvider = ({
  children,
  specification,
}: UserStoreProviderProps) => {
  const [initialState, setInitialState] = useState<UserState>({
    users: [],
    currentUser: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const usersRepository = new UsersRepository();
          const users = specification
            ? await usersRepository.getBySpecification(specification)
            : await usersRepository.get();
          let currentUser = users.find((user) => user.uid === firebaseUser.uid);
          if (!currentUser) {
            currentUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: UserRole.DEVELOPER,
              photoURL: firebaseUser.photoURL,
            };
            await usersRepository.create(currentUser);
          }

          setInitialState({ users, currentUser });
        } else {
          setInitialState({ users: [], currentUser: null });
        }
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [specification]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <UserStoreContext.Provider value={createUserStore(initialState)}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
