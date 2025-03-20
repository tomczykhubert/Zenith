import { useParams } from "next/navigation";

type StaticRoutes = {
  home: string;
  projects: string;
  createProject: string;
  userSignIn: string;
  userRegister: string;
  userProfile: string;
  userSignOut: string;
  userVerify: string;
};

type DynamicRoutes = {
  projectTasks: (projectId: string) => string;
  projectUserStories: (projectId: string) => string;
  createTask: (projectId: string) => string;
  createUserStory: (projectId: string) => string;
};

export const routes: StaticRoutes & DynamicRoutes = {
  home: "/",
  projects: "/projects",
  projectTasks: (projectId: string) => `/projects/${projectId}/tasks`,
  projectUserStories: (projectId: string) =>
    `/projects/${projectId}/userStories`,
  createProject: "/projects/create",
  createTask: (projectId: string) => `/projects/${projectId}/tasks/create`,
  createUserStory: (projectId: string) =>
    `/projects/${projectId}/userStories/create`,
  userSignIn: "/user/signin",
  userRegister: "/user/register",
  userProfile: "/user/profile",
  userSignOut: "/user/signout",
  userVerify: "/user/verify",
};

const useLocalizedRoute = (route: string) => {
  const lang = useParams().lang as string;
  return `/${lang}${route}`;
};

export { useLocalizedRoute };
