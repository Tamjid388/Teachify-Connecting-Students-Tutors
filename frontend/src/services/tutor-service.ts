import { env } from "@/env";
import { AvailabilityPayload, getAllTutorsParams } from "@/Types/Ttutor";

export type TutorProfilePayload = {
  image: string;
  bio: string;
  rating?: number;
  experience: number;
  education: string;
};

export const tutorService = {
  createProfile: async (data: TutorProfilePayload, cookieString: string) => {

    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}tutors`, {
      method: "POST",
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to create tutor profile");
    }

    return res.json();
  },
  myProfile:async(options?:RequestInit)=>{
try {
    const res=await fetch(`${env.BACKEND_URL}tutors/my-profile`,{
    method:"GET",
    credentials:"include",
    ...options,
    next:{
      tags:["tutor"],
      revalidate:120
    },
  })
      if (!res.ok) {
        console.log(res)
      return {
        data: null,
        error: "Request failed",
      };
    }
  const result=await res.json()
  return {data:result,error:null}
} catch (error:any) {
  return {
    error:error.message,
    message:"Something went wrong"
  }
}
},
  updateProfile: async (data: TutorProfilePayload, cookieString: string) => {

    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}tutors/update`, {
      method: "PUT",
      credentials:"include",
      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString
      },
      body: JSON.stringify(data),
    });
    console.log("update profile res",res);
    if (!res.ok) {
      throw new Error("Failed to update tutor profile");
    }

    return res.json();
  },
 

  getAllTutors: async (params: getAllTutorsParams) => {
    const url = new URL(`${env.BACKEND_URL}tutors`)


    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.set(key, value.toString());
        }
      });
    }

    const res = await fetch(url.toString(), {
      method: "GET",

      credentials: "include",
      next: {
        tags: ["alltutors"],
        revalidate: 120
      },
    });

    return res.json();
  },

  addAvailabilitySlot: async (payload: AvailabilityPayload, cookieString: string) => {


    const res = await fetch(`${env.BACKEND_URL}tutors/slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString
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
