import { prisma } from "../../lib/prisma"


const createReview = async (userId: string, body: any) => {
    const { booking_id, rating, comment } = body
    const booking = await prisma.booking.findUnique({
        where: { booking_id }
    })
    if (!booking) {
        throw new Error("Booking not found")
    }
    if (booking.studentId !== userId) {
        throw new Error("You are not allowed to review this booking");
    }
    if (booking.bookingStatus !== "COMPLETED") {
        throw new Error("You can only review completed bookings");
    }
    if (booking.isReviewed) {
        throw new Error("You have already reviewed this booking");
    }
    const tutorId = booking.tutor_id

    return prisma.$transaction(async (tx) => {
        const createReview = await tx.review.create({
            data: {
                booking_id,
                rating,
                comment,
                userId,
                tutorId
            }
        })
        await tx.booking.update({
            where: { booking_id },
            data: {
                isReviewed: true
            }
        })

        const stats = await tx.review.aggregate({
            where: { tutorId },
            _avg: { rating: true },
            _count: { rating: true }
        });

        await tx.tutor.update({
            where: { tutor_id: tutorId },
            data: {
                averageRating: stats._avg.rating || 0,
                reviewCount: stats._count.rating
            }
        });
        return createReview
    })

}
export const reviewServices = {
    createReview
}