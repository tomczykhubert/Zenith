import Task from "@/types/task";
import { TasksRepository } from "@/repositories/tasksRepository";
import { createStore } from "zustand/vanilla";

export type TaskSpecification = Partial<Task>;

export type TasksState = {
  tasks: Task[];
};

export type TasksActions = {
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | null;
};

export type TasksStore = TasksState & TasksActions;

export const defaultInitState: TasksState = {
  tasks: [],
};

export const createTasksStore = (initState: TasksState = defaultInitState) => {
  const tasksRepository = new TasksRepository();
  return createStore<TasksState & TasksActions>((set, get) => ({
    ...initState,
    addTask: (task: Task) => {
      tasksRepository.create(task);
      set((state) => {
        return {
          tasks: [...state.tasks, task],
        };
      });
    },
    updateTask: (updatedTask: Task) => {
      tasksRepository.update(updatedTask);
      set((state) => {
        const updatedTasks = state.tasks?.map((task) =>
          task.uid === updatedTask.uid ? updatedTask : task
        );
        return { ...state, tasks: updatedTasks };
      });
    },
    deleteTask: (uid: string) => {
      tasksRepository.delete(uid);
      set((state) => {
        const updatedTasks = state.tasks?.filter((task) => task.uid !== uid);
        return { ...state, tasks: updatedTasks };
      });
    },
    getTaskById: (uid: string) => {
      return get().tasks.find((task) => task.uid === uid) ?? null;
    },
  }));
};
