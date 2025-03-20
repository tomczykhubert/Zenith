import Project from "@/types/project";
import { ProjectsRepository } from "@/repositories/projectsRepository";
import { createStore } from "zustand/vanilla";

export type ProjectSpecification = Partial<Project>;

export type ProjectsState = {
  projects: Project[];
};

export type ProjectsActions = {
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | null;
};

export type ProjectsStore = ProjectsState & ProjectsActions;

export const defaultInitState: ProjectsState = {
  projects: [],
};

export const createProjectsStore = (
  initState: ProjectsState = defaultInitState
) => {
  const projectsRepository = new ProjectsRepository();

  return createStore<ProjectsState & ProjectsActions>((set, get) => ({
    ...initState,
    addProject: (project: Project) => {
      projectsRepository.create(project);
      set((state) => ({
        projects: [...state.projects, project],
      }));
    },
    updateProject: (updatedProject: Project) => {
      projectsRepository.update(updatedProject);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.uid === updatedProject.uid ? updatedProject : project
        ),
      }));
    },
    deleteProject: (uid: string) => {
      projectsRepository.delete(uid);
      set((state) => ({
        projects: state.projects.filter((project) => project.uid !== uid),
      }));
    },
    getProjectById: (uid: string) => {
      return get().projects.find((project) => project.uid === uid) ?? null;
    },
  }));
};
