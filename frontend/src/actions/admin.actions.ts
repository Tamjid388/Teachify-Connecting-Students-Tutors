// actions.ts
"use server"

import { adminService } from "@/services/admin-service";

type Payload={
    subject:string,
    description:string
}
export async function createSubjectAction(data:Payload) {
  return await adminService.addSubject(data);
}