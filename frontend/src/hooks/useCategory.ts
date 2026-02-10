import { categoryService } from "@/services/category-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSubjects = () => {
  return useQuery({
    queryKey: ["allSubjects"],
    queryFn: categoryService.getAllSubjects,
    
    staleTime: 5 * 60 * 1000, 
  });
};


export const useAssignSubjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subjectIds: string[]) => categoryService.assignSubjects(subjectIds),
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ["allSubjects"] });
     
    },
  });
};