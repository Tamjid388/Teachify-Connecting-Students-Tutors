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

export const userBanToggle = async (req: Request, res: Response) => {
  try {
    const { userId, isBanned } = req.body;

    if (!userId || typeof isBanned !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid input. userId and isBanned status are required.",
      });
    }

    const updatedUser = await adminServices.updateBanStatus(userId, isBanned);

    return res.status(200).json({
      success: true,
      message: `User has been ${isBanned ? "banned" : "unbanned"} successfully.`,
      result: updatedUser,
    });
  } catch (error: any) {
    console.error("Error in handleUserBanToggle:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error while updating status.",
    });
  }
};

const adminStats = async (req: Request, res: Response) => {
  try {
    const admin = req.user;
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const stats = await adminServices.adminStats();
    res.status(200).json({
      success: true,
      message: "Admin stats retrieved successfully",
      result: stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get admin stats",
      error,
    });
  }
};
export const adminController = {
  getAllUsers,
  adminStats,
  userBanToggle,
};
