import { apiRoutes } from "@/lib/routes/apiRoutes";
import Task from "@/types/task";
import { createStore } from "zustand/vanilla";

export type TaskSpecification = Partial<Task>;

export type TasksState = {
  tasks: Task[];
};

export type TasksActions = {
  addTask: (
    task: Omit<
      Task,
      "id" | "createdAt" | "updatedAt" | "startedAt" | "completedAt"
    >
  ) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | null;
  fetchTasks: () => Promise<void>;
};

export type TasksStore = TasksState & TasksActions;

export const defaultInitState: TasksState = {
  tasks: [],
};

export const createTasksStore = (initState: TasksState = defaultInitState) => {
  return createStore<TasksState & TasksActions>((set, get) => ({
    ...initState,
    fetchTasks: async () => {
      const response = await fetch(apiRoutes.tasks.base);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();
      set({ tasks });
    },
    addTask: async (
      task: Omit<
        Task,
        "id" | "createdAt" | "updatedAt" | "startedAt" | "completedAt"
      >
    ) => {
      const response = await fetch(apiRoutes.tasks.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to create task");
      const newTask = await response.json();
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    },
    updateTask: async (updatedTask: Task) => {
      const response = await fetch(apiRoutes.tasks.byId(updatedTask.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const updated = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updated : task
        ),
      }));
    },
    deleteTask: async (id: string) => {
      const response = await fetch(apiRoutes.tasks.byId(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    },
    getTaskById: (id: string) => {
      return get().tasks.find((task) => task.id === id) ?? null;
    },
  }));
};
