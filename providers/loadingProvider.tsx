"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import Spinner from "@/components/blocks/common/spinner";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addLoader: () => void;
  removeLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingCountRef = useRef(0);

  const addLoader = useCallback(() => {
    loadingCountRef.current += 1;
    setIsLoading(loadingCountRef.current > 0);
  }, []);

  const removeLoader = useCallback(() => {
    loadingCountRef.current = Math.max(0, loadingCountRef.current - 1);
    setIsLoading(loadingCountRef.current > 0);
  }, []);

  const setLoadingState = useCallback((loading: boolean) => {
    loadingCountRef.current = loading ? 1 : 0;
    setIsLoading(loading);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading: setLoadingState,
        addLoader,
        removeLoader,
      }}
    >
      {isLoading && <Spinner />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};
