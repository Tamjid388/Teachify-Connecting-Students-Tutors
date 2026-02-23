import { tutorService } from "@/services/tutor-service";
import { useQuery } from "@tanstack/react-query";

export const fetchSlotByIdFromClient = async (slotId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${baseUrl}tutors/slots/${slotId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Could not fetch slot data");
  }

  return response.json();
};
export const useGetSlotById = (tutorId: string) => {
  return useQuery({
    queryKey: ["slot", tutorId],
    queryFn: () => fetchSlotByIdFromClient(tutorId),
  });
};
 