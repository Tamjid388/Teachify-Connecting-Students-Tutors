import TutorList from '@/components/modules/tutors/TutorList';
import { tutorService } from '@/services/tutor-service';

export default async function Tutors({ searchParams }:{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const params=await searchParams

    const tutorsParams = {
    search: typeof params.search === "string" ? params.search : undefined,
    rating: typeof params.rating === "string" ? Number(params.rating) : undefined,
  
  };
  console.log("Constructed tutorsParams:", tutorsParams);
console.log("Received search params in page component:", params.search);
  const result = await tutorService.getAllTutors(tutorsParams);

  const tutors=result?.result || []


  return (
    <div>
      <div className="p-6">
        <TutorList tutors={tutors} />
      </div>
    </div>
  );
}
