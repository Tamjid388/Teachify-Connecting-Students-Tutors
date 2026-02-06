import { tutorService } from '@/services/tutor-service';


export default async function Tutors() {
  const tutors = await tutorService.getAllTutors();
  console.log(tutors);
  return (
    <div>page</div>
  )
}
