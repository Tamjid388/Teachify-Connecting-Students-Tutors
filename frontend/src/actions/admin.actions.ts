"use server";

import { adminService } from "@/services/admin-service";
import { categoryService } from "@/services/category-service";
import { cookies } from "next/headers";

type SubjectPayload = { subject: string; description: string };

export async function createSubjectAction(data: SubjectPayload) {
  return await adminService.addSubject(data);
}

export async function banUserAction(payload: {
  userId: string;
  isBanned: boolean;
}) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    return await adminService.banUser(payload, cookieHeader);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update user status";
    throw new Error(message);
  }
}

export async function assignSubjectsAction(subjectIds: string[]) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    return await categoryService.assignSubjectsServer(subjectIds, cookieHeader);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to assign subjects";
    throw new Error(message);
  }
}