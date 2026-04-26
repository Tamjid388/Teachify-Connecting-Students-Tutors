import { env } from "@/env";
import { BookingInfo } from "@/Types/TBooking";

const BASE_URL = `${env.NEXT_PUBLIC_BACKEND_URL}`;

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export const bookingService = {
  createBooking: async (payload: BookingInfo, cookieHeader?: string) => {
    try {
      const response = await fetch(`${BASE_URL}bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || "Failed to create booking");
      }

      return response.json();
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, "Something went wrong"));
    }
  },

  getAllBookings: async (cookieHeader?: string) => {
    try {
      const response = await fetch(`${BASE_URL}bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || "Failed to fetch bookings");
      }

      const result = await response.json();
      return result;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, "Something went wrong"));
    }
  },
  updateBookingStatus: async (
    payload: { id: string; bookingStatus: string },
    cookieHeader?: string,
  ) => {
    try {
      const response = await fetch(`${BASE_URL}bookings/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ bookingStatus: payload.bookingStatus }),
      });
      console.log(response);
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || "Failed to update booking status");
      }

      const result = await response.json();
      return result;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error, "Something went wrong"));
    }
  },
};
