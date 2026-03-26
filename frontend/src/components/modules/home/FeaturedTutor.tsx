import { tutorService } from "@/services/tutor-service";

async function  FeaturedTutor() {
      const result = await tutorService.getAllTutors({});
    
      const tutors=result?.result || []
    return(
        <div>
        </div>
    )
}


export default FeaturedTutor