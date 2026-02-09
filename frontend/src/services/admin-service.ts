import { env } from "@/env";
import { cookies } from "next/headers";

export const adminService = {
  getAllUsers: async () => {
    try {
      const cookieStore =await cookies();
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
};
