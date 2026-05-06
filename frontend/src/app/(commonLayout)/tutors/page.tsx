import TutorList from "@/components/modules/tutors/TutorList";
import { tutorService } from "@/services/tutor-service";
import type { TutorsPaginationMeta } from "@/Types/Ttutor";

function parsePositiveInt(
  value: string | string[] | undefined,
  fallback: number,
  max?: number,
) {
  const raw = typeof value === "string" ? Number(value) : NaN;
  if (!Number.isInteger(raw) || raw < 1) return fallback;
  if (max !== undefined && raw > max) return max;
  return raw;
}

export default async function Tutors({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const page = parsePositiveInt(params.page, 1);
  const limit = parsePositiveInt(params.limit, 6, 100);

  const tutorsParams = {
    search: typeof params.search === "string" ? params.search : undefined,
    rating:
      typeof params.rating === "string" ? Number(params.rating) : undefined,
    page,
    limit,
  };

  const result = await tutorService.getAllTutors(tutorsParams);

  const tutors = result?.result || [];
  const pagination = result?.pagination as TutorsPaginationMeta | undefined;

  return (
    <div>
      <div className="p-6">
        <TutorList tutors={tutors} pagination={pagination} />
      </div>
    </div>
  );
}
