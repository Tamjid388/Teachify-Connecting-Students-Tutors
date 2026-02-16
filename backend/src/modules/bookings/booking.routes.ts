import { Router } from "express";
import { bookingController } from "./booking.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware("STUDENT","ADMIN"),bookingController.createBooking)
router.get("/",authMiddleware("STUDENT","ADMIN","TUTOR"),bookingController.getBookings)
router.get("/:id",authMiddleware("STUDENT","TUTOR"),bookingController.getBookingById)
router.put("/:id",authMiddleware("STUDENT","TUTOR"),bookingController.updateBookingStatus)
export const bookingsRouter = router;