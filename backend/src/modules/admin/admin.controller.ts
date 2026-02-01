import { Request, Response } from "express";
import { adminServices } from "./admin.service";


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const admin = req.user;

   
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const users = await adminServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      result: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error,
    });
  }
};


const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const admin = req.user;
    const { id }  = req.params ;
    const { status } = req.body;

    // Admin check
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (!status || !["ACTIVE", "INACTIVE", "BAN"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }
    if (!id ||  Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const updatedUser = await adminServices.updateUserStatus(id, status);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      result: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error,
    });
  }
};
export const adminController = {
  getAllUsers,updateUserStatus
};