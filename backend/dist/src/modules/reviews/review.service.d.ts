export declare const reviewServices: {
    createReview: (userId: string, body: any) => Promise<{
        rating: number;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tutorId: string;
        booking_id: string;
        comment: string | null;
    }>;
    getReview: (id: string) => Promise<({
        user: {
            image: string | null;
            name: string;
            email: string;
        };
        booking: {
            createdAt: Date;
            startTime: Date;
            endTime: Date;
            booking_id: string;
        };
    } & {
        rating: number;
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tutorId: string;
        booking_id: string;
        comment: string | null;
    })[]>;
};
//# sourceMappingURL=review.service.d.ts.map