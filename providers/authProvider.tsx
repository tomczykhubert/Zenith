"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthState, AuthStore, createAuthStore } from "@/stores/authStore";
import { useStore } from "zustand";
import Spinner from "@/components/blocks/common/spinner";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import { AUTH_CONFIG } from "@/lib/auth/config";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export function AuthStoreProvider({ children }: { children: React.ReactNode }) {
  const [initialState, setInitialState] = useState<AuthState>({
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetch(apiRoutes.auth.refresh, {
          method: "POST",
        });

        const response = await fetch(apiRoutes.auth.me);
        if (response.ok) {
          const userData = await response.json();
          setInitialState({ user: userData });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setInitialState({ user: null });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const intervalId = setInterval(
      checkAuth,
      (AUTH_CONFIG.accessToken.maxAge - 60) * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthStoreContext.Provider value={createAuthStore(initialState)}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStoreStore must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
