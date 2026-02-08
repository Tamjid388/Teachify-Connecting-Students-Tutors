"use server";

import { tutorService } from "@/services/tutor-service";
import { AvailabilityPayload } from "@/Types/Ttutor";

export const createTutorProfile = async () => {};
export const addAvailabilitySlot = async (payload: AvailabilityPayload) => {
  return await tutorService.addAvailabilitySlot(payload);
};
