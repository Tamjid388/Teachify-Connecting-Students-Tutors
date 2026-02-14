import TutorDetails from "@/components/modules/tutors/tutorDatails/TutorDetails";
import { tutorService } from "@/services/tutor-service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const {data,error}=await tutorService.getTutorById(id)
  console.log(data.data);
  return <div className="max-w-7xl mx-auto">
<TutorDetails data={data.data}/>
  </div>;
}
