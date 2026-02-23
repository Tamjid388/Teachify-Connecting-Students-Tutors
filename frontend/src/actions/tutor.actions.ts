"use server";

import { TutorProfilePayload, tutorService } from "@/services/tutor-service";
import { AvailabilityPayload } from "@/Types/Ttutor";
import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";

export const createTutorProfileAction = async (data: TutorProfilePayload) => {

  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()
    return await tutorService.createProfile(data, cookieString)
  } catch (error) {
    console.log(error)
    throw new Error("Action Failed to create profile")
  }
};
export const updateTutorProfileAction = async (data: TutorProfilePayload) => {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()
    const result = await tutorService.updateProfile(data, cookieString)
    revalidateTag("tutor","profile")
    return result
  } catch (error:any) {
    console.log(error)
    throw new Error( error?.message ||"Action Failed to update profile")
  }
}



export const addAvailabilitySlot = async (payload: AvailabilityPayload) => {

  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    return await tutorService.addAvailabilitySlot(payload, cookieString);
  } catch (error) {
    throw new Error("Action Failed to add slot")
  }
};

