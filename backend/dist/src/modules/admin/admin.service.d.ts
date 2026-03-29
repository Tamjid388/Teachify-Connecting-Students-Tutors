import { Role, UserStatus } from "../../../prisma/generated/prisma/enums";
export declare const updateBanStatus: (userId: string, isBanned: boolean) => Promise<{
    name: string;
    id: string;
    email: string;
    isBanned: boolean;
}>;
export declare const adminServices: {
    getAllUsers: () => Promise<{
        role: Role;
        image: string | null;
        name: string;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        isBanned: boolean;
        banReason: string | null;
        status: UserStatus;
    }[]>;
    adminStats: () => Promise<{
        totalUsers: number;
        totalTutors: number;
        totalStudents: number;
        totalBookings: number;
        totalReviews: number;
        totalCompletedBookings: number;
    }>;
    updateBanStatus: (userId: string, isBanned: boolean) => Promise<{
        name: string;
        id: string;
        email: string;
        isBanned: boolean;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map