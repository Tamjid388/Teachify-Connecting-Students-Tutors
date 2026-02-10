import { Router } from "express";
import { categoryController } from "./category.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/addSubjects",
  authMiddleware("ADMIN"),
  categoryController.addSubjects,
);
router.get(
  "/getSubjects",
  authMiddleware("ADMIN", "STUDENT", "TUTOR"),
  categoryController.getAllSubjects,
);
router.post(
  "/assignSubjects",
  authMiddleware("TUTOR"),
  categoryController.assignSubject,
);
export const categoryRouter = router;
