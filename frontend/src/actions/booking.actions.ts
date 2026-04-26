"use server";

import { bookingService } from "@/services/booking-service";
import { BookingInfo } from "@/Types/TBooking";
import { cookies } from "next/headers";

export const createBookingAction = async (payload: BookingInfo) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    return await bookingService.createBooking(payload, cookieString);
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Action failed to create booking";
    throw new Error(message);
  }
};

export const updateBookingStatusAction = async (id: string, bookingStatus: string) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    return await bookingService.updateBookingStatus({ id, bookingStatus }, cookieString);
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Action failed to update booking status";
    throw new Error(message);
  }
};
