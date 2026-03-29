import { Availability, DayOfWeek } from "../../../prisma/generated/prisma/enums";
import { TutorUpdateInput } from "../../../prisma/generated/prisma/models";
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
type TSlots = {
    day: DayOfWeek;
    startTime: string;
    endTime: string;
};
export declare const tutorServices: {
    createTutor: (body: PayloadType, user: AuthUser) => Promise<{
        tutor_id: string;
        image: string | null;
        bio: string | null;
        avilability_slot: Availability;
        phone_number: string | null;
        is_verified: boolean;
        experience: number;
        education: string;
        averageRating: number;
        reviewCount: number;
        userId: string;
    }>;
    getAllTutors: ({ search, rating, }: {
        search: string | undefined;
        rating: string | undefined;
    }) => Promise<({
        user: {
            name: string;
        };
        categories: ({
            category: {
                id: string;
                subject: string;
                description: string | null;
                thumbnail: string | null;
                slug: string | null;
            };
        } & {
            tutorId: string;
            categoryId: string;
        })[];
    } & {
        tutor_id: string;
        image: string | null;
        bio: string | null;
        avilability_slot: Availability;
        phone_number: string | null;
        is_verified: boolean;
        experience: number;
        education: string;
        averageRating: number;
        reviewCount: number;
        userId: string;
    })[]>;
    updateTutor: (body: TutorUpdateInput, user: AuthUser) => Promise<{
        tutor_id: string;
        image: string | null;
        bio: string | null;
        avilability_slot: Availability;
        phone_number: string | null;
        is_verified: boolean;
        experience: number;
        education: string;
        averageRating: number;
        reviewCount: number;
        userId: string;
    }>;
    updateAvailability: (slot: Availability, user: AuthUser) => Promise<{
        avilability_slot: Availability;
    }>;
    createSlots: (slots: TSlots[], userId: string) => Promise<TSlots[]>;
    getSlots: (id: string) => Promise<({
        bookings: {
            tutor_id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            booking_id: string;
            bookingStatus: import("../../../prisma/generated/prisma/enums").BookingStatus;
            duration: number;
            tutionMode: import("../../../prisma/generated/prisma/enums").TuitionMode;
            paymentStatus: import("../../../prisma/generated/prisma/enums").PaymentStatus;
            studentId: string;
            isReviewed: boolean;
            slotId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tutorId: string;
        day: DayOfWeek;
        startTime: string;
        endTime: string;
        isBooked: boolean;
    })[]>;
    getTutorById: (tutorId: string) => Promise<({
        categories: ({
            category: {
                id: string;
                subject: string;
                description: string | null;
                thumbnail: string | null;
                slug: string | null;
            };
        } & {
            tutorId: string;
            categoryId: string;
        })[];
        _count: {
            reviews: number;
        };
    } & {
        tutor_id: string;
        image: string | null;
        bio: string | null;
        avilability_slot: Availability;
        phone_number: string | null;
        is_verified: boolean;
        experience: number;
        education: string;
        averageRating: number;
        reviewCount: number;
        userId: string;
    }) | null>;
    getTutorStats: (userId: string) => Promise<{
        totalBookings: number;
        pendingBookings: number;
        acceptedBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        totalStudents: number;
        averageRating: number;
        totalReviews: number;
    }>;
    myProfile: (user: AuthUser) => Promise<({
        user: {
            role: import("../../../prisma/generated/prisma/enums").Role;
            image: string | null;
            name: string;
            id: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            isBanned: boolean;
            banReason: string | null;
            status: import("../../../prisma/generated/prisma/enums").UserStatus;
        };
        categories: ({
            category: {
                id: string;
                subject: string;
                description: string | null;
                thumbnail: string | null;
                slug: string | null;
            };
        } & {
            tutorId: string;
            categoryId: string;
        })[];
    } & {
        tutor_id: string;
        image: string | null;
        bio: string | null;
        avilability_slot: Availability;
        phone_number: string | null;
        is_verified: boolean;
        experience: number;
        education: string;
        averageRating: number;
        reviewCount: number;
        userId: string;
    }) | null>;
};
export {};
//# sourceMappingURL=tutor.service.d.ts.map