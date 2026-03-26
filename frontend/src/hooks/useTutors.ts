import { tutorService } from "@/services/tutor-service";
import { getAllTutorsParams, TTutor } from "@/Types/Ttutor";
import { useQuery } from "@tanstack/react-query";

export const useFilterTutors=(params:getAllTutorsParams,initialData:TTutor)=>{
    return useQuery({
        queryKey:["alltutors",JSON.stringify(params)],
        queryFn:async()=>await tutorService.getAllTutors(params),
        initialData:initialData,
        staleTime: 0,
        refetchOnMount: true
    })
}
  
