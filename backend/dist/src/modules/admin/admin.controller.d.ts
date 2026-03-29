import { Request, Response } from "express";
export declare const userBanToggle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const adminController: {
    getAllUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    adminStats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    userBanToggle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=admin.controller.d.ts.map