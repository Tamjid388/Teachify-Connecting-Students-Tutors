import { v4 as uuidv4 } from "uuid";
import { BookingStatus, Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../config/stripe";

const createBooking = async (data: any, userId: string) => {
 

  const { slotId, startTime, endTime, hourlyRate } = data;

  if (!slotId) {
    throw new Error("slotId is required");
  }

  const result = await prisma.$transaction(async (tx) => {
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
      throw new Error(
        "This slot is already booked for this specific date and time",
      );
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
      data: { isBooked: true },
    });

    const transactionId = uuidv4();

    const paymentData = await tx.payment.create({
      data: {
        transactionId: transactionId.toString(),
        bookingId: booking.booking_id,
      },
    });

    const tutor = await tx.tutor.findUnique({
      where: { tutor_id: slot.tutorId },
      include: { user: { select: { name: true } } },
    });
   

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: `Tutoring session with ${tutor?.user?.name ?? "Tutor"}`,
            },
            unit_amount: (tutor?.hourlyRate ?? 0) * 120,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.booking_id,
        paymentId: paymentData.id,
      },
      success_url: `${process.env.App_URL}/payment/success`,
      cancel_url: `${process.env.App_URL}/payment/cancel`,
    });

    return {
      booking,
      paymentData,
      paymentUrl: session.url,
    };
  });

  return {
    booking: result.booking,
    paymentData: result.paymentData,
    paymentUrl: result.paymentUrl,
  };
};




const getAllBookings = async (userId: string, role: Role) => {
  if (role === Role.STUDENT) {
    return await prisma.booking.findMany({
      where: { studentId: userId },
      include: {
        tutor: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  // If use ris tutor
  if (role === Role.TUTOR) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId },
    });

    if (!tutor) return [];

    return await prisma.booking.findMany({
      where: { tutor_id: tutor.tutor_id },
      include: {
        student: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
};

const getBookingById = async (id: string, role: Role) => {
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

const updateBookingStatus = async (
  id: string,
  bookingStatus: BookingStatus,
) => {
  return await prisma.$transaction(async (tx) => {
  
    const currentBooking = await tx.booking.findUnique({
      where: { booking_id: id },
    });
   
    if (
      currentBooking?.bookingStatus === BookingStatus.REJECTED ||
      currentBooking?.bookingStatus === BookingStatus.CANCELLED
    ) {
      throw new Error("Cannot update a rejected or cancelled booking");
    }
    const booking = await tx.booking.update({
      where: { booking_id: id },
      data: { bookingStatus },
    });
    if (
      bookingStatus === BookingStatus.REJECTED ||
      bookingStatus === BookingStatus.CANCELLED
    ) {
      await tx.availabilitySlot.update({
        where: { id: booking.slotId },
        data: { isBooked: false },
      });
    }
    return booking;
  });
};

const syncBookingStatus = async (id: string, bookingStatus: BookingStatus) => {
  return await prisma.booking.updateMany({
    where: {
      OR: [{ studentId: id }, { tutor_id: id }],
      endTime: {
        lt: new Date(),
      },
      bookingStatus: BookingStatus.ACCEPTED,
    },
    data: { bookingStatus: BookingStatus.COMPLETED },
  });
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  syncBookingStatus,
};
