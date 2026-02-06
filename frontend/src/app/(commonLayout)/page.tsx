
import { authClient } from "@/lib/auth-client";
import Hero from "./_sections/Hero";
import WhyChoose from "./_sections/WhyChoose";
import { userService } from "@/services/user-service";

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
    </div>
  );
}
