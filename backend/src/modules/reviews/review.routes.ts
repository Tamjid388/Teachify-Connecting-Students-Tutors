import { Router } from "express";
import { reviewController } from "./review.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router=Router()
router.post("/",authMiddleware("STUDENT","ADMIN"),reviewController.createReview)


export const reviewRouter=router