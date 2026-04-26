import { tutorService } from "@/services/tutor-service";
import { useQuery } from "@tanstack/react-query";

export const useGetSlotById = (tutorId: string) => {
  return useQuery({
    queryKey: ["slot", tutorId],
    queryFn: () => tutorService.getSlotsByTutorId(tutorId),
    enabled: !!tutorId,
  });
};
