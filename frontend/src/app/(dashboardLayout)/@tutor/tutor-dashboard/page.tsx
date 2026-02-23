import TutorInfos from "@/components/modules/tutor-dashboard/tutor-profile/TutorInfos";
import { tutorService } from "@/services/tutor-service";
import { CloudCog } from "lucide-react";
import { cookies } from "next/headers";



export default async function page() {
const cookieStore=await cookies()
const cookieString=cookieStore.toString() 

const {data,error}=await tutorService.myProfile({headers:{Cookie:cookieString}})
const profile=data?.result

  return (
    <div>
      <h1 className="text-4xl font-bold
      text-custom-primary
      ">Welcome To Tutor Dashboard</h1>
      <main>
     <TutorInfos profile={profile}/>
      </main>
      </div>
  )
}
