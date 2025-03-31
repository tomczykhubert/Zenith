"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import { createTasksStore, TasksStore, TasksState } from "@/stores/tasksStore";
import Spinner from "@/components/blocks/spinner";
import { ProviderProps } from "./base";
import Task from "@/types/task";
import { apiRoutes } from "@/lib/routes/apiRoutes";

export type TasksStoreApi = ReturnType<typeof createTasksStore>;

export const TasksStoreContext = createContext<TasksStoreApi | undefined>(
  undefined
);

export const TasksStoreProvider = ({
  children,
  specification,
  order,
}: ProviderProps<Task>) => {
  const [initialState, setInitialState] = useState<TasksState>({
    tasks: [],
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
        const url = `${apiRoutes.tasks.base}${
          queryString ? `?${queryString}` : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        setInitialState({ tasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setInitialState({ tasks: [] });
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
    <TasksStoreContext.Provider value={createTasksStore(initialState)}>
      {children}
    </TasksStoreContext.Provider>
  );
};

export const useTasksStore = <T,>(selector: (store: TasksStore) => T): T => {
  const tasksStoreContext = useContext(TasksStoreContext);

  if (!tasksStoreContext) {
    throw new Error(`useTasksStore must be used within TasksStoreProvider`);
  }

  return useStore(tasksStoreContext, selector);
};
