import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { success } from "better-auth";

 const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId=req.user?.id
    if(!userId){
        return res.status(401).json({ message:"User Id Required" });
    }
    const booking = await bookingServices.createBooking(data,userId);
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


 const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingServices.getAllBookings();
     res.status(201).json({
        success:true,
        messgae:"Bookings Retreived Successfully"
     });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking by id
//  const getBookingById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const booking = await bookingServices.getBookingById(id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json(booking);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const bookingController={
    createBooking,getBookings
}