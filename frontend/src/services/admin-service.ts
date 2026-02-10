import { env } from "@/env";
import { error } from "console";
import { cookies } from "next/headers";

export const adminService = {
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.BACKEND_URL}admin/users`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },

        next: {
          tags: ["allusers"],
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get users");
      }
      const data = await res.json();
      console.log(data);
      return { data, error: null };
    } catch (err) {
      console.error("ADMIN SERVICE ERROR 👉", err);
      return { data: null, error: "Something went wrong" };
    }
  },
  addSubject: async (subjectData: {
    subject: string;
    description?: string;
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}category/addSubjects`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectData),
        cache: "no-store",
      });

      if (!res.ok) {
        const errData = await res.json();
        return {
          data: null,
          error: errData.message || "Backend error",
        };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  },
};
