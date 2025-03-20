"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";

import { createTasksStore, TasksStore, TasksState } from "@/stores/tasksStore";
import Spinner from "@/components/blocks/spinner";
import { TasksRepository } from "@/repositories/tasksRepository";
import { QuerySpecification } from "@/repositories/baseRepository";

export type TasksStoreApi = ReturnType<typeof createTasksStore>;

export const TasksStoreContext = createContext<TasksStoreApi | undefined>(
  undefined
);

export interface TasksStoreProviderProps {
  children: ReactNode;
  specification?: QuerySpecification[];
}

export const TasksStoreProvider = ({
  children,
  specification,
}: TasksStoreProviderProps) => {
  const [initialTasks, setInitialTasks] = useState<TasksState>({
    tasks: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const tasksRepository = new TasksRepository();
        const tasks = specification
          ? await tasksRepository.getBySpecification(specification)
          : await tasksRepository.get();
        setInitialTasks({ tasks: tasks });
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
    <TasksStoreContext.Provider value={createTasksStore(initialTasks)}>
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
