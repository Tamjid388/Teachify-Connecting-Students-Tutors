export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const TuitionMode: {
    readonly ONLINE: "ONLINE";
    readonly OFFLINE: "OFFLINE";
    readonly BOTH: "BOTH";
};
export type TuitionMode = (typeof TuitionMode)[keyof typeof TuitionMode];
export declare const PaymentStatus: {
    readonly UNPAID: "UNPAID";
    readonly PAID: "PAID";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const DayOfWeek: {
    readonly SUN: "SUN";
    readonly MON: "MON";
    readonly TUE: "TUE";
    readonly WED: "WED";
    readonly THU: "THU";
    readonly FRI: "FRI";
    readonly SAT: "SAT";
};
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export declare const Availability: {
    readonly MORNING: "MORNING";
    readonly EVENING: "EVENING";
    readonly FULLDAY: "FULLDAY";
    readonly NOT_AVAILABLE: "NOT_AVAILABLE";
};
export type Availability = (typeof Availability)[keyof typeof Availability];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly DEACTIVE: "DEACTIVE";
    readonly BAN: "BAN";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly TUTOR: "TUTOR";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
//# sourceMappingURL=enums.d.ts.map