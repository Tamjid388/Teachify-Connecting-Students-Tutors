import { env } from "@/env";

const BASE_URL = `${env.NEXT_PUBLIC_BACKEND_URL}`;

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export const bookingService = {
  getAllBookings: async () => {
    try {
      const response = await fetch(`${BASE_URL}bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  updateBookingStatus: async (payload: {
    id: string;
    bookingStatus: string;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}bookings/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
