import TutorList from '@/components/modules/tutors/TutorList';
import { tutorService } from '@/services/tutor-service';

export default async function Tutors() {


  const tutors = await tutorService.getAllTutors({});

  return (
    <div>
      <div className="p-6">
        <TutorList initialTutors={tutors} />
      </div>
    </div>
  );
}
