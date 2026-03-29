import { Request, Response } from "express";
export declare const addAvailabilitySlots: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAvailabilitySlots: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const tutorController: {
    createTutorProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllTutors: (req: Request, res: Response) => Promise<void>;
    updateTutor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addAvailabilitySlots: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAvailabilitySlots: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTutorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getTutorStats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    myProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=tutor.controller.d.ts.map