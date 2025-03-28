import { createStore } from "zustand";
import User from "@/types/user";
import { UserRole } from "@prisma/client";
import { apiRoutes } from "@/lib/routes/apiRoutes";

export interface AuthState {
  user: User | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ) => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthState & AuthActions>((set) => ({
    ...initState,
    login: async (email, password) => {
      try {
        const res = await fetch(apiRoutes.auth.login, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const user = await res.json();
        set({ user });
      } catch (error) {
        throw error;
      }
    },
    logout: async () => {
      try {
        await fetch(apiRoutes.auth.logout, {
          method: "POST",
          credentials: "include",
        });
        set({ user: null });
      } catch (error) {
        throw error;
      }
    },
    register: async (email, password, displayName, role) => {
      try {
        const res = await fetch(apiRoutes.auth.register, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, displayName, role }),
        });
        if (!res.ok) throw new Error("Registration failed");
      } catch (error) {
        throw error;
      }
    },
  }));
};
