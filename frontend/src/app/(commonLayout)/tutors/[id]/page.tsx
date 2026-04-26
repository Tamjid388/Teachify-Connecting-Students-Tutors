import TutorDetails from "@/components/modules/tutors/tutorDatails/TutorDetails";
import { tutorService } from "@/services/tutor-service";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [tutorResult, slotsResult] = await Promise.all([
    tutorService.getTutorById(id),
    tutorService.getSlotById(id, cookieHeader).catch(() => ({ data: [] })),
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <TutorDetails data={tutorResult.data?.data} slots={slotsResult?.data ?? []} />
    </div>
  );
}
