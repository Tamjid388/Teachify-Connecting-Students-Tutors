import { env } from "@/env";

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
};