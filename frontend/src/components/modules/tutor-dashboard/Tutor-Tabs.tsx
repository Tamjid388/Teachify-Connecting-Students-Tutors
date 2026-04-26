import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProfileForm from "./AddProfileForm";
import AddSlots from "./Add-Slots";
import AddSubjects, { Subject } from "./AddSubjects";
import { tutorService } from "@/services/tutor-service";
import { categoryService } from "@/services/category-service";
import { cookies } from "next/headers";
import { ISlot } from "./tutor-slots";

export default async function TutorTabs() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const profileResult = await tutorService.myProfile({ headers: { Cookie: cookieString } });
  const profile = profileResult.data?.result;
  const userId: string = profile?.userId ?? "";

  const [slotsResult, subjectsResult] = await Promise.all([
    tutorService.getSlotById(userId, cookieString).catch(() => ({ data: [] })),
    categoryService.getAllSubjectsServer(cookieString).catch(() => ({ data: [] })),
  ]);

  const slots: ISlot[] = slotsResult?.data ?? [];
  const subjects: Subject[] = subjectsResult?.data ?? [];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger value="profile">Create-Profile</TabsTrigger>
        <TabsTrigger value="availability">Assign Slots</TabsTrigger>
        <TabsTrigger value="subjects">Add Subjects</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <AddProfileForm profile={profile} />
      </TabsContent>
      <TabsContent value="availability">
        <AddSlots slots={slots} />
      </TabsContent>
      <TabsContent value="subjects">
        <AddSubjects subjects={subjects} />
      </TabsContent>
    </Tabs>
  );
}
