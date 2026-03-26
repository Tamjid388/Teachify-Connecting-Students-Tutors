import axios from "axios";
import { env } from "@/env";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/client/admin.api";
import { toast } from "sonner";

export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_URL}admin/stats`, {
      withCredentials: true
    });
    console.log(response)
    return response.data.result;
  
  } catch (error) {
    console.error("Error fetching admin stats:", error);

    
    throw new Error("error fetching admin stats");
  }
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats
  })
}
 

export const useBanUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { userId: string; isBanned: boolean }) => adminApi.banUser(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success(data?.message || "User status updated successfully");
    
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user status");
    }
  })
}
