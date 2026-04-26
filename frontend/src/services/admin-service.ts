import { env } from "@/env";

import { cookies } from "next/headers";

export const adminService = {
  getAdminStats: async (cookieHeader: string) => {
    const res = await fetch(`${env.BACKEND_URL}admin/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { tags: ["admin-stats"] },
    });

    if (!res.ok) throw new Error("Failed to fetch admin stats");
    const data = await res.json();
    return data.result;
  },

  banUser: async (
    payload: { userId: string; isBanned: boolean },
    cookieHeader: string,
  ) => {
    const res = await fetch(`${env.BACKEND_URL}admin/banUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update user status");
    }

    return res.json();
  },

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
