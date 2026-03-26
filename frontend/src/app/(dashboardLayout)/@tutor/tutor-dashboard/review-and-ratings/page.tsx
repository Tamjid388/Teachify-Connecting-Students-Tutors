import ReviewsAndRatings from "@/components/modules/tutor-dashboard/reviews-and-ratings/ReviewsAndRatings";
import { tutorService } from "@/services/tutor-service";
import { cookies } from "next/headers";



export default async function ReviewAndRatings() {
    const cookieStore=await cookies()
const cookieString=cookieStore.toString() 

const {data,error}=await tutorService.myProfile({headers:{Cookie:cookieString}})
const profile=data?.result
    return <div><ReviewsAndRatings profile={profile}/></div>;
}