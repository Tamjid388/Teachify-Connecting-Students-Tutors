import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
// const { scheduledAt, duration, tutionMode, paymentStatus, tutor_id } = data;
const createBooking = async (data: any, userId: string) => {
console.log("Booking Data",data);
  const { slotId } = data;

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

    if (slot.isBooked) {
      throw new Error("This slot is already booked");
    }

   
    const booking = await tx.booking.create({
      data: {
        studentId: userId,
        tutor_id: slot.tutorId,
       slotId: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        duration:
          (slot.endTime.getTime() - slot.startTime.getTime()) / 60000,
      },
    });

   
    await tx.availabilitySlot.update({
      where: { id: slot.id },
      data: {
        isBooked: true,
        bookingId: booking.booking_id,
      },
    });

    return booking;
  });



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
