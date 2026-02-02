import { Router } from "express";
import { bookingController } from "./booking.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware("STUDENT","ADMIN"),bookingController.createBooking)
router.get("/",bookingController.getBookings)
export const bookingsRouter = router;