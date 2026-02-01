
import { Availability } from "../../../prisma/generated/prisma/enums";
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

const updateAvailability = async (
  slot: Availability,
  user: AuthUser
) => {

  const result = await prisma.tutor.update({
    where: { userId: user.id },
    data: { avilability_slot: slot },
    select:{
      avilability_slot:true
    }
  });

  return result;
};

export const tutorServices = { createTutor, getAllTutors, updateTutor ,updateAvailability};
