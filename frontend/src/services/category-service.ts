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

  getAllSubjectsServer: async (cookieHeader: string) => {
    const res = await fetch(`${env.BACKEND_URL}category/getSubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { tags: ["subjects"] },
    });

    if (!res.ok) throw new Error("Failed to fetch subjects");

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
      throw new Error(result.message || result.error || "Something went wrong");
    }

    return result;
  },

  assignSubjectsServer: async (
    subjectIds: string[],
    cookieHeader: string,
  ) => {
    const res = await fetch(`${env.BACKEND_URL}category/assignSubjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ subjectIds }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || result.error || "Something went wrong");
    }

    return result;
  },
};
