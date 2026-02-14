import { env } from "@/env";
import { AvailabilityPayload } from "@/Types/Ttutor";
import { cookies } from "next/headers";
export type TutorProfilePayload = {
  image: string;
  bio: string;
  rating: number;
  experience: number;
  education: string;
};
export const tutorService = {
  createProfile: async (data: TutorProfilePayload) => {
    const cookieStore=await cookies()
    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}tutors`, {
      method: "POST",
      cache: "no-store",
      
      headers: {
        "Content-Type": "application/json",
        "Cookie":cookieStore.toString()
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
const cookieStore = await cookies();
  
  const res = await fetch(`${env.BACKEND_URL}tutors/slots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie":cookieStore.toString()
    },
    body: JSON.stringify(payload),
    
  });

  return res.json();
},
 getTutorById: async (tutorId: string) => {
   try {
     if (!tutorId) {
      throw new Error("Tutor ID is required");
    }

    const res = await fetch(
      `${env.BACKEND_URL}tutors/${tutorId}`,
      {
        method: "GET",
        credentials: "include",
        next: {
          tags: [`tutor-${tutorId}`],
        },
      }
    );
   if (!res.ok) {
      return {
        data: null,
        error: "Failed to fetch tutor profile",
      };
    }

      const result = await res.json();
       return {
      data: result,
      error: null,
    };
   } catch (error) {
     console.error("getTutorById error 👉", error);
    return {
      data: null,
      error: "Something went wrong",
    };
   }
  },
 

getSlotById: async (slotId: string) => {
  const res = await fetch(`${env.BACKEND_URL}tutors/slots/${slotId}`, {
    method: "GET",
    
    
  });

  if (!res.ok) {
    throw new Error("Failed to fetch slot data");
  }

  return res.json();
},

};
