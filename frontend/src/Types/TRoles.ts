export const USER_ROLES = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TUTOR: "TUTOR",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

