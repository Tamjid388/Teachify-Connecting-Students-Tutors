import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProfileForm from "./AddProfileForm";
import AddSlots from "./Add-Slots";
import AddSubjects from "./AddSubjects";
import { tutorService } from "@/services/tutor-service";
import { cookies } from "next/headers";
export default async function TutorTabs() {

const cookieStore=await cookies()
const cookieString=cookieStore.toString() 

const {data,error}=await tutorService.myProfile({headers:{Cookie:cookieString}})
const profile=data?.result

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger  value="profile">Create-Profile</TabsTrigger>
        <TabsTrigger value="availability">Assign Slots</TabsTrigger>
        <TabsTrigger value="subjects">Add Subjects</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <AddProfileForm profile={profile}  />
      </TabsContent>
      <TabsContent value="availability">
        <AddSlots />
      </TabsContent>
      <TabsContent value="subjects">
        <AddSubjects />
      </TabsContent>
    </Tabs>
  );
}
