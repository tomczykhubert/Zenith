import ID from "@/types/id";

export const apiRoutes = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    me: "/api/auth/me",
  },
  projects: {
    base: "/api/projects",
    byId: (id: ID) => `/api/projects/${id}`,
  },
  tasks: {
    base: "/api/tasks",
    byId: (id: ID) => `/api/tasks/${id}`,
  },
  userStories: {
    base: "/api/user-stories",
    byId: (id: ID) => `/api/user-stories/${id}`,
  },
  users: {
    base: "/api/users",
    byId: (id: ID) => `/api/users/${id}`,
  },
};
