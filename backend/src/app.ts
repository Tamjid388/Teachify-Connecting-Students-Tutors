import express, { Application } from "express"

import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRouter } from "./modules/tutors/tutor.routes";
const app:Application=express();

app.use(express.json())
app.use(cors({
    origin:process.env.App_URL || "http://localhost:3000",
    credentials:true 
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutors",tutorRouter)

app.get("/",(req,res)=>{
    res.send("Hello World!")
})
export default app
