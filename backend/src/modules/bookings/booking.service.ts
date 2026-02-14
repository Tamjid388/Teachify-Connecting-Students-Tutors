import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
// const { scheduledAt, duration, tutionMode, paymentStatus, tutor_id } = data;
const createBooking = async (data: any, userId: string) => {
  console.log("Booking Data", data);
  
  const { slotId, startTime, endTime } = data;

  if (!slotId) {
    throw new Error("slotId is required");
  }
  return await prisma.$transaction(async (tx) => {
    const slot = await tx.availabilitySlot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      throw new Error("Slot not found");
    }

  const existingBooking = await tx.booking.findFirst({
      where: {
        slotId: slotId,
        startTime: startTime,
        bookingStatus: {
          not: "CANCELLED", 
        },
      },
    });

    if (existingBooking) {
     
      throw new Error("This slot is already booked for this specific date and time");
    }

    const booking = await tx.booking.create({
      data: {
        studentId: userId,
        tutor_id: slot.tutorId,
        slotId: slot.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    await tx.availabilitySlot.update({
      where: { id: slot.id },
      data: {
        isBooked: true,
      },
    });

    return booking;
  });
};

const getAllBookings = async (userId: string, role: Role) => {
  console.log("User ID", userId);
  console.log("Role", role);
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

  
};

const getBookingById = async (id: string,role:Role) => {

  if (role === Role.STUDENT) {
    return await prisma.booking.findMany({
      where: {
        studentId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
    if (role === Role.TUTOR) {
    return await prisma.booking.findMany({
      where: {
        tutor_id: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingById,
};
