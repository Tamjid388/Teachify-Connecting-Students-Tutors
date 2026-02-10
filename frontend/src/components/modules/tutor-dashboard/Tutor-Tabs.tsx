import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProfileForm from "./AddProfileForm";
import AddSlots from "./Add-Slots";
import AddSubjectForm from "../admin-dashboard/AddSubjectForm";
import AddSubjects from "./AddSubjects";
export default function TutorTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger value="profile">Create-Profile</TabsTrigger>
        <TabsTrigger value="availability">Assign Slots</TabsTrigger>
        <TabsTrigger value="subjects">Add Subjects</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <AddProfileForm />
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
