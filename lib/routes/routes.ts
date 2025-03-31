import ID from "@/types/id";

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
  },
  userStories: {
    list: `/userStories`,
    create: `/userStories/create`,
    tasks: {
      list: (userStoryId: ID) => `/userStories/${userStoryId}/tasks`,
      create: (userStoryId: ID) => `/userStories/${userStoryId}/tasks/create`,
    },
  },
} as const;
