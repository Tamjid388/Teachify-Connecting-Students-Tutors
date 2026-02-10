import { env } from "@/env";

export const categoryService = {

  getAllSubjects: async () => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}category/getSubjects`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error("Server response was not ok");

    return res.json();
  },
  assignSubjects: async (subjectIds: string[]) => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}category/assignSubjects`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectIds }),
        credentials: "include",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      console.log("Backend says:", result);
      throw new Error(result.message || result.error || "Something went wrong");
    }

    return result;
  },
};
