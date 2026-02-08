import { env } from "@/env";
import { AvailabilityPayload } from "@/Types/Ttutor";
export type TutorProfilePayload = {
  image: string;
  bio: string;
  rating: number;
  experience: number;
  education: string;
};
export const tutorService = {
  createProfile: async (data: TutorProfilePayload) => {
    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}tutors`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to create tutor profile");
    }

    return res.json();
  },

  getAllTutors: async () => {
    const res = await fetch(`${env.BACKEND_URL}tutors`, {
      method: "GET",

      credentials: "include",
      next: {
        tags: ["alltutors"],
      },
    });

    return res.json();
  },

addAvailabilitySlot: async (payload:AvailabilityPayload) => {
  const res = await fetch(`${env.BACKEND_URL}tutors/slots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
    
  });

  return res.json();
},


};
