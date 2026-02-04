import { Availability, DayOfWeek } from "../../../prisma/generated/prisma/enums";
import { TutorUpdateInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { AuthUser } from "../../types/user";

type PayloadType = {
  bio: string;
  avilability_slot: Availability;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  experience: number;
  education: string;
};

const createTutor = async (body: PayloadType, user: AuthUser) => {
  const result = await prisma.tutor.create({
    data: {
      ...body,
      userId: user.id,
    },
  });

  return result;
};

const getAllTutors = async () => {
  return await prisma.tutor.findMany();
};

const updateTutor = async (body: TutorUpdateInput, user: AuthUser) => {
  return await prisma.tutor.update({
    where: {
      userId: user.id,
    },
    data: body,
  });
};

const updateAvailability = async (slot: Availability, user: AuthUser) => {
  const result = await prisma.tutor.update({
    where: { userId: user.id },
    data: { avilability_slot: slot },
    select: {
      avilability_slot: true,
    },
  });

  return result;
};
type TSlots = {
  day: DayOfWeek;
  startTime: Date;
  endTime: Date;
};
const createSlots = async (slots: TSlots[], userId: string) => {
  const tutor = await prisma.tutor.findUnique({
    where: { userId },
  });
  if (!tutor) {
    throw new Error("Tutor profile not found for this user");
  }

  const tutorId: string = tutor.tutor_id;
  const createdSlots: TSlots[] = [];
  await prisma.$transaction(async (tx) => {
    for (const slot of slots) {
      const { day, startTime, endTime } = slot;
      const existing = await tx.availabilitySlot.findFirst({
        where: {
          tutorId,
          day,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      if(existing) continue
            const newSlot = await tx.availabilitySlot.create({
        data: {
          tutorId,
          day,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      createdSlots.push(newSlot);
    } 
  });
   return createdSlots;
};
export const tutorServices = {
  createTutor,
  getAllTutors,
  updateTutor,
  updateAvailability,
  createSlots,
};
