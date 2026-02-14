import {
  Availability,
  DayOfWeek,
} from "../../../prisma/generated/prisma/enums";
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
 
  const tutors = await prisma.tutor.findMany({
    include: {
      user: {
        select: { name: true },
      },
      categories: {
        include: { category: true },
      },
    },
  });

 
  const tutorsWithStats = await Promise.all(
    tutors.map(async (tutor) => {
      const stats = await prisma.review.aggregate({
        where: { tutorId: tutor.tutor_id },
        _count: { rating: true },
        _avg: { rating: true },
      });


      return {
        ...tutor,
        name: tutor.user.name,
        categories: tutor.categories.map((c) => c.category),
        reviewCount: stats._count.rating,
        averageRating: stats._avg.rating || 0,
      };
    })
  );

  return tutorsWithStats;
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
  startTime: string;
  endTime: string;
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
          startTime,
          endTime,
        },
      });

      if (existing) continue;
      const newSlot = await tx.availabilitySlot.create({
        data: {
          tutorId,
          day,
          startTime,
          endTime,
        },
      });

      createdSlots.push(newSlot);
    }
  });
  return createdSlots;
};

const getSlots = async (id: string) => {
  const slots = await prisma.availabilitySlot.findMany({
    where: {
      tutorId: id,
    },include:{
      bookings:true
    },
    orderBy:{
      day:"asc"
    }
  });

  if(slots.length===0){
    throw new Error("Tutor Doesnt Have Any Available Slots")
  }
  return slots;
};

const getTutorById = async (tutorId: string) => {
  const tutor = await prisma.tutor.findUnique({
    where: {
      tutor_id: tutorId,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      _count:{
        select:{
          reviews:true
        }
      }
    },
  });

  return tutor;
};

export const tutorServices = {
  createTutor,
  getAllTutors,
  updateTutor,
  updateAvailability,
  createSlots,
  getSlots,
  getTutorById,
};
