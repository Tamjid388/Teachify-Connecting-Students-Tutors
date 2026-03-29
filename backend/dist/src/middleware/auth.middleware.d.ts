import { NextFunction, Request, Response } from "express";
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
declare const authMiddleware: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map