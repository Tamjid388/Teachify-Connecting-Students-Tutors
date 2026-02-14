"use server";

import { TutorProfilePayload, tutorService } from "@/services/tutor-service";
import { AvailabilityPayload } from "@/Types/Ttutor";

export const createTutorProfileAction = async (data:TutorProfilePayload) => {
  return await tutorService.createProfile(data)
};
export const addAvailabilitySlot = async (payload: AvailabilityPayload) => {
  return await tutorService.addAvailabilitySlot(payload);
};
