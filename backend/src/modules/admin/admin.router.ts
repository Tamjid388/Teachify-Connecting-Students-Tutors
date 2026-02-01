import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router=Router()

router.get("/users", authMiddleware("ADMIN"), adminController.getAllUsers);
router.patch(
  "/users/:id",
  authMiddleware("ADMIN"),
  
  adminController.updateUserStatus
);


export const adminRouter=router