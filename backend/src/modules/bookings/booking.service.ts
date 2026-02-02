import { prisma } from "../../lib/prisma";
// const { scheduledAt, duration, tutionMode, paymentStatus, tutor_id } = data;
const createBooking = async (data: any, userId: string) => {
  

  const booking = await prisma.booking.create({
    data:{
        ...data,studentId:userId
    }
  });

  return booking;
};

const getAllBookings = async () => {

};
const getBookingById = async (id: string) => {
//   return prisma.booking.findUnique({
//     where: { id },
//     include: { tutor: true, student: true, course: true },
//   });
};



export const bookingServices={
    createBooking,getAllBookings,getBookingById
}