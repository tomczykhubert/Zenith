import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma/prismaSingleton";
import { UserRole } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Zenith",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        enum: UserRole,
        default: UserRole.DEVELOPER,
      },
      activeProjectId: {
        type: "string",
        required: false,
        default: null,
      },
    },
  },
  plugins: [nextCookies()],
  session: {
    expiresIn: 24 * 60 * 60, // 24 hours
  },
});
