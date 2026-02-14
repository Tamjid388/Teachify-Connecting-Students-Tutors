import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";


import { Role } from "../../prisma/generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}
const authMiddleware = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      


      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Your Are Not Authorized",
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
      };
console.log("User Role:", req.user.role);
      if (roles.length && !roles.includes(req.user.role as Role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access ,You dont have permission",
        });
      }

      next();
    } catch (error) {
      console.error("Authentication midddleware failed");
    }
  };
};
export default authMiddleware;
