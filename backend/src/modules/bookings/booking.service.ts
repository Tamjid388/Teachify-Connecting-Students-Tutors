import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
// const { scheduledAt, duration, tutionMode, paymentStatus, tutor_id } = data;
const createBooking = async (data: any, userId: string) => {
  const booking = await prisma.booking.create({
    data: {
      ...data,
      studentId: userId,
    },
  });

  return booking;
};

const getAllBookings = async (userId: string, role: Role) => {
  if (role === Role.STUDENT) {
    return await prisma.booking.findMany({
      where: { studentId: userId },
    });
  }

  if (role === Role.TUTOR) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId },
    });

    if (!tutor) return [];

    return await prisma.booking.findMany({
      where: { tutor_id: tutor.tutor_id },
    });
  }

  return [];
};



const getBookingById = async (id: string) => {
    // return prisma.booking.findUnique({
    //   where: { id },
    //   include: { tutor: true, student: true, course: true },
    // });
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingById,
};
