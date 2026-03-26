
import { authClient } from "@/lib/auth-client";
import Hero from "./_sections/Hero";
import WhyChoose from "./_sections/WhyChoose";
import { userService } from "@/services/user-service";
import FeaturedTutor from "@/components/modules/home/FeaturedTutor";
import WhyUnique from "@/components/modules/home/WhyUnique";
import WeMadeEasy from "@/components/modules/home/WeMadeEasy";

export default async function Home() {
const {data,error}=await userService.getSession()
console.log("get user data",data);

  return (
    <div
      className="
   "
    >
      <Hero />
      <WhyChoose/>
      <WhyUnique/>
      <FeaturedTutor/>
      <WeMadeEasy/>
    </div>
  );
}
