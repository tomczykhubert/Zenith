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
  createProjectsStore,
  ProjectsState,
  ProjectsStore,
} from "@/stores/projectsStore";
import { ProjectsRepository } from "@/repositories/projectsRepository";
import Spinner from "@/components/blocks/spinner";
import { QuerySpecification } from "@/repositories/baseRepository";

export type ProjectsStoreApi = ReturnType<typeof createProjectsStore>;

export const ProjectsStoreContext = createContext<ProjectsStoreApi | undefined>(
  undefined
);

export interface ProjectsStoreProviderProps {
  children: ReactNode;
  specification?: QuerySpecification[];
}

export const ProjectsStoreProvider = ({
  children,
  specification,
}: ProjectsStoreProviderProps) => {
  const [initialState, setInitialState] = useState<ProjectsState>({
    projects: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const projectsManager = new ProjectsRepository();
        const projects = specification
          ? await projectsManager.getBySpecification(specification)
          : await projectsManager.get();
        setInitialState({ projects });
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
    <ProjectsStoreContext.Provider value={createProjectsStore(initialState)}>
      {children}
    </ProjectsStoreContext.Provider>
  );
};

export const useProjectsStore = <T,>(
  selector: (store: ProjectsStore) => T
): T => {
  const projectsStoreContext = useContext(ProjectsStoreContext);

  if (!projectsStoreContext) {
    throw new Error(
      `useProjectsStore must be used within ProjectsStoreProvider`
    );
  }

  return useStore(projectsStoreContext, selector);
};
