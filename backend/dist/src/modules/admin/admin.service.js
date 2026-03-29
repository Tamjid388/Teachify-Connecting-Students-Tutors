import { BookingStatus, Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const getAllUsers = async () => {
    return await prisma.user.findMany();
};
export const updateBanStatus = async (userId, isBanned) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { isBanned },
        select: {
            id: true,
            email: true,
            isBanned: true,
            name: true,
        },
    });
};
const adminStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalTutors = await prisma.user.count({ where: { role: Role.TUTOR } });
    const totalStudents = await prisma.user.count({ where: { role: Role.STUDENT } });
    const totalBookings = await prisma.booking.count();
    const totalReviews = await prisma.review.count();
    const totalCompletedBookings = await prisma.booking.count({ where: { bookingStatus: BookingStatus.COMPLETED } });
    return {
        totalUsers,
        totalTutors,
        totalStudents,
        totalBookings,
        totalReviews,
        totalCompletedBookings
    };
};
export const adminServices = {
    getAllUsers, adminStats, updateBanStatus
};
//# sourceMappingURL=admin.service.js.map