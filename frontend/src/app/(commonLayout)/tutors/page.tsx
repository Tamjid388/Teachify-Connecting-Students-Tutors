import TutorList from '@/components/modules/tutors/TutorList';
import { tutorService } from '@/services/tutor-service';


export default async function Tutors() {
  const tutors = await tutorService.getAllTutors();
  const allTutors=tutors?.result
  console.log(allTutors);
  return (
    <div>
         <div className="p-6">
      <TutorList tutors={allTutors} />
    </div>
    </div>
  )
}
