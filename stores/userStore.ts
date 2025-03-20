import { User } from "@/types/user";
import { UsersRepository } from "@/repositories/usersRepository";
import { createStore } from "zustand/vanilla";

export type UserState = {
  users: User[];
  currentUser: User | null;
};

export type UserActions = {
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => User | null;
  setCurrentUser: (user: User | null) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  users: [],
  currentUser: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  const usersRepository = new UsersRepository();

  return createStore<UserStore>((set, get) => ({
    ...initState,
    addUser: async (user: User) => {
      await usersRepository.create(user);
      set((state) => ({
        users: [...state.users, user],
      }));
    },
    updateUser: async (updatedUser: User) => {
      await usersRepository.update(updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.uid === updatedUser.uid ? updatedUser : user
        ),
        currentUser:
          state.currentUser?.uid === updatedUser.uid
            ? updatedUser
            : state.currentUser,
      }));
    },
    deleteUser: async (uid: string) => {
      await usersRepository.delete(uid);
      set((state) => ({
        users: state.users.filter((user) => user.uid !== uid),
      }));
    },
    getUserById: (uid: string) => {
      return get().users.find((user) => user.uid === uid) ?? null;
    },
    setCurrentUser: (user: User | null) => {
      set({ currentUser: user });
    },
  }));
};
