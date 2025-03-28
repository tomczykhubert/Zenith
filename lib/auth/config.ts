import { apiRoutes } from "../routes/apiRoutes";
import { routes } from "../routes/routes";
export const AUTH_CONFIG = {
  accessToken: {
    maxAge: 15 * 60, // 15 minutes
    name: "token",
  },
  refreshToken: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    name: "refreshToken",
  },
  cookies: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  },
} as const;

export const PUBLIC_PATHS = [
  apiRoutes.auth.login,
  apiRoutes.auth.register,
  apiRoutes.auth.refresh,
  routes.user.signIn,
  routes.user.register,
];
