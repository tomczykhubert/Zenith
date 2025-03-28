"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import {
  createProjectsStore,
  ProjectsState,
  ProjectsStore,
} from "@/stores/projectsStore";
import Spinner from "@/components/blocks/spinner";
import { ProviderProps } from "./base";
import Project from "@/types/project";
import { apiRoutes } from "@/lib/routes/apiRoutes";

export type ProjectsStoreApi = ReturnType<typeof createProjectsStore>;

export const ProjectsStoreContext = createContext<ProjectsStoreApi | undefined>(
  undefined
);

export const ProjectsStoreProvider = ({
  children,
  specification,
  order,
}: ProviderProps<Project>) => {
  const [initialState, setInitialState] = useState<ProjectsState>({
    projects: [],
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
        const url = `${apiRoutes.projects.base}${
          queryString ? `?${queryString}` : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projects = await response.json();
        setInitialState({ projects });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setInitialState({ projects: [] });
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
