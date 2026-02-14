import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { array, string, success } from "better-auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User Id Required" });
    }
    const booking = await bookingServices.createBooking(data, userId);
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    if (!userId) {
      return res.status(401).json({ message: "User Id Required" });
    }
    const bookings = await bookingServices.getAllBookings(userId, role as Role);
    res.status(201).json({
      success: true,
      messgae: "Bookings Retreived Successfully",
      bookings,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking by id
const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = req.user?.role;
    if (!id) {
      return res.status(401).json({ message: "User Id Required" });
    }
    if (!role) {
      return res.status(401).json({ message: "User role required" });
    }
    const booking = await bookingServices.getBookingById(
      id as string,
      role as Role,
    );
    if(!booking){
      return res.status(404).json({
        success:false,
        data:null,
        message:"No Bookings found for this user"
      })
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  getBookingById,
};
