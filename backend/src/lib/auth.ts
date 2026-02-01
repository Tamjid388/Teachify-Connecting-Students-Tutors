import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../../prisma/generated/prisma/enums";





export const auth = betterAuth({
database:prismaAdapter(prisma,{
    provider:"postgresql"
}),
user:{
  additionalFields:{
    role:{
      type:"string",
      defaultValue:Role.STUDENT,
      required:false
    }
  }
},
  emailAndPassword: { 
    enabled: true, 
  },
});