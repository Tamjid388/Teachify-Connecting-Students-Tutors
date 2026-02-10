import { TutorCategory } from "../../../prisma/generated/prisma/client";
import { CategoryCreateInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";

const addSubjects = async (body: CategoryCreateInput) => {
  const result = await prisma.category.createMany({
    data: body,
    skipDuplicates: true,
  });
  return result;
};

const getAllSubjects = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const assignSubject = async (
  payload: { subjectIds: string[] },
  tutorId: string,
) => {
  const tutorExists = await prisma.tutor.findUnique({
    where: { userId: tutorId },
    select: { tutor_id: true },
  });
  if (!tutorExists) {
    throw new Error("Tutor not found in database. Check the tutorId.");
  }
  const result = await prisma.tutorCategory.createMany({
    data: payload.subjectIds.map((subId) => ({
      tutorId:tutorExists.tutor_id,
      categoryId: subId,
    })),
    skipDuplicates: true,
  });

  return result;
};

export const categoryServices = {
  addSubjects,
  assignSubject,
  getAllSubjects,
};
