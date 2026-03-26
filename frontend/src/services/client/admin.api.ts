import { env } from "@/env"
import axios from "axios"

export const adminApi = {
    banUser: async (payload: { userId: string; isBanned: boolean }) => {
        const { data } = await axios.patch(
            `${env.NEXT_PUBLIC_BACKEND_URL}admin/banUser`,
            payload,
            { withCredentials: true }
        );
        console.log("Ban user response:", data);
        return data;
    },
};
