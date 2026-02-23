import { tutorService } from "@/services/tutor-service";
import { getAllTutorsParams } from "@/Types/Ttutor";
import { useQuery } from "@tanstack/react-query";

export const useFilterTutors=(params:getAllTutorsParams,initialData:any)=>{
    return useQuery({
        queryKey:["alltutors",params],
        queryFn:async()=>await tutorService.getAllTutors(params),
        initialData:initialData,
        staleTime:60*1000
            
        
    })
}
  
