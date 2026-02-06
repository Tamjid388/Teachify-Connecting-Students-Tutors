import express, { Application } from "express"

import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRouter } from "./modules/tutors/tutor.routes";
import { adminRouter } from "./modules/admin/admin.router";
import { bookingsRouter } from "./modules/bookings/booking.routes";
import { reviewRouter } from "./modules/reviews/review.routes";
const app:Application=express();


app.use(cors({
    origin:process.env.App_URL || "http://localhost:3000",
    credentials:true 
}))

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json())
app.use("/api/tutors",tutorRouter)
app.use("/api/bookings",bookingsRouter)
app.use("/api/admin",adminRouter)
app.use("api/reviews",reviewRouter)
app.get("/",(req,res)=>{
    res.send("Hello World!")
})
export default app
