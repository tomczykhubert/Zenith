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
    byId: (id: string) => `/api/projects/${id}`,
  },
  tasks: {
    base: "/api/tasks",
    byId: (id: string) => `/api/tasks/${id}`,
  },
  userStories: {
    base: "/api/user-stories",
    byId: (id: string) => `/api/user-stories/${id}`,
  },
  users: {
    base: "/api/users",
    byId: (id: string) => `/api/users/${id}`,
  },
};
