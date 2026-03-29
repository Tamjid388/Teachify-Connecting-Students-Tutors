import { CategoryCreateInput } from "../../../prisma/generated/prisma/models";
export declare const categoryServices: {
    addSubjects: (body: CategoryCreateInput) => Promise<import("../../../prisma/generated/prisma/internal/prismaNamespace").BatchPayload>;
    assignSubject: (payload: {
        subjectIds: string[];
    }, tutorId: string) => Promise<import("../../../prisma/generated/prisma/internal/prismaNamespace").BatchPayload>;
    getAllSubjects: () => Promise<{
        id: string;
        subject: string;
        description: string | null;
        thumbnail: string | null;
        slug: string | null;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map