import { env } from "@/env";

const BASE_URL = `${env.NEXT_PUBLIC_BACKEND_URL}`;

export type CreateReviewPayload = {
    booking_id: string;
    rating: number;
    comment: string;
   
};

export const reviewService = {
    createReview: async (data: CreateReviewPayload) => {
        try {
            const response = await fetch(`${BASE_URL}reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
console.log(response)
            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || "Failed to create review");
            }

            const result = await response.json();
            return result;
        } catch (error: any) {
            throw new Error(error.message || "Something went wrong");
        }
    },
};
