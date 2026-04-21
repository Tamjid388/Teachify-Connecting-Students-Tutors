import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../../prisma/generated/prisma/enums";

const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({

  baseURL: process.env.BETTER_AUTH_URL || "https://teachify-server.vercel.app",
   
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // baseURL: process.env.App_URL,//for production
  trustedOrigins: [process.env.App_URL!],

  advanced: {
    cookies: {
      session_token: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
      state: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
    },
  },



  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.STUDENT,
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
