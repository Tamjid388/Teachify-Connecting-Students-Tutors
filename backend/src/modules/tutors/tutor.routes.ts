import { Router } from "express";
import { tutorController } from "./tutor.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();
router.get("/", tutorController.getAllTutors);
router.post(
  "/",
  authMiddleware("TUTOR", "ADMIN"),
  tutorController.createTutorProfile,
);
router.put(
  "/update",
  authMiddleware("TUTOR", "ADMIN"),
  tutorController.updateTutor,
);


router.put(
  "/update/availability",
  authMiddleware("TUTOR"),
  tutorController.updateAvailability,
);

export const tutorRouter = router;
