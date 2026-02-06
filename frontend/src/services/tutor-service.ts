import { env } from "@/env";

export const tutorService = {
  createProfile: async (data:string) => {
    const res = await fetch(`${env.BACKEND_URL}tutors`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

    getAllTutors: async () => {
    const res = await fetch(`${env.BACKEND_URL}tutors`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    return res.json();
  },
};
