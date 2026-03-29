import { Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateBookingStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=booking.controller.d.ts.map