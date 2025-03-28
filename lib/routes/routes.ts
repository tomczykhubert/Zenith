export const routes = {
  home: "/",
  user: {
    signIn: "/user/signin",
    register: "/user/register",
    profile: "/user/profile",
    signOut: "/user/signout",
    verify: "/user/verify",
  },
  projects: {
    list: "/projects",
    create: "/projects/create",
    tasks: {
      list: (projectId: string) => `/projects/${projectId}/tasks`,
      create: (projectId: string) => `/projects/${projectId}/tasks/create`,
    },
    UserStories: {
      list: (projectId: string) => `/projects/${projectId}/userStories`,
      create: (projectId: string) =>
        `/projects/${projectId}/userStories/create`,
    },
  },
} as const;
