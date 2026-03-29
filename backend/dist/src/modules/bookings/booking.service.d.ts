import { BookingStatus, Role } from "../../../prisma/generated/prisma/enums";
export declare const bookingServices: {
    createBooking: (data: any, userId: string) => Promise<{
        tutor_id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        booking_id: string;
        bookingStatus: BookingStatus;
        duration: number;
        tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
        paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
        studentId: string;
        isReviewed: boolean;
        slotId: string;
    }>;
    getAllBookings: (userId: string, role: Role) => Promise<({
        tutor: {
            user: {
                name: string;
                email: string;
            };
        };
    } & {
        tutor_id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        booking_id: string;
        bookingStatus: BookingStatus;
        duration: number;
        tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
        paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
        studentId: string;
        isReviewed: boolean;
        slotId: string;
    })[] | ({
        student: {
            name: string;
            email: string;
        };
    } & {
        tutor_id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        booking_id: string;
        bookingStatus: BookingStatus;
        duration: number;
        tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
        paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
        studentId: string;
        isReviewed: boolean;
        slotId: string;
    })[] | undefined>;
    getBookingById: (id: string, role: Role) => Promise<{
        tutor_id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        booking_id: string;
        bookingStatus: BookingStatus;
        duration: number;
        tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
        paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
        studentId: string;
        isReviewed: boolean;
        slotId: string;
    }[] | undefined>;
    updateBookingStatus: (id: string, bookingStatus: BookingStatus) => Promise<{
        tutor_id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        booking_id: string;
        bookingStatus: BookingStatus;
        duration: number;
        tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
        paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
        studentId: string;
        isReviewed: boolean;
        slotId: string;
    }>;
    syncBookingStatus: (id: string, bookingStatus: BookingStatus) => Promise<import("../../../prisma/generated/prisma/internal/prismaNamespace").BatchPayload>;
};
//# sourceMappingURL=booking.service.d.ts.map