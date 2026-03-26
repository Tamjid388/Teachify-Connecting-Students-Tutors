import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router=Router()

router.get("/users", authMiddleware("ADMIN"), adminController.getAllUsers);

router.get("/stats", authMiddleware("ADMIN"), adminController.adminStats);
router.patch("/banUser",authMiddleware("ADMIN"),adminController.userBanToggle)
export const adminRouter=router
