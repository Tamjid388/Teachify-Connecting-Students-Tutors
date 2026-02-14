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
//tutor info by tutorId
router.get("/:tutorId",tutorController.getTutorById)

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

//add slots
router.post("/slots",authMiddleware("TUTOR","ADMIN","STUDENT"),tutorController.addAvailabilitySlots)

//get slots
router.get("/slots/:tutorId",authMiddleware("TUTOR","ADMIN","STUDENT"),tutorController.getAvailabilitySlots)

export const tutorRouter = router;



// /tutor/slots
// /tutor/slots/:slotId

// /tutors/:tutorId/slots