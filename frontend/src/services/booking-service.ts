import { env } from "@/env";
import { CloudCog } from "lucide-react";

const BASE_URL = `${env.NEXT_PUBLIC_BACKEND_URL}`;

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
            return result
        } catch (error: any) {
            throw new Error(error.message || "Something went wrong");
        }
    },
    updateBookingStatus: async (payload: { id: string, bookingStatus: string }) => {
        try {
            const response = await fetch(`${BASE_URL}bookings/${payload.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ bookingStatus: payload.bookingStatus }),
            });
            console.log(response)
            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || "Failed to update booking status");
            }

            const result = await response.json();
            return result
        } catch (error: any) {
            throw new Error(error.message || "Something went wrong");
        }
    }
};