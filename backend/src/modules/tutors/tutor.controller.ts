import { Request, Response } from "express";
import { tutorServices } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
      });
    }
    const result = await tutorServices.createTutor(body, user);
    res.status(200).json({
      success: true,
      message: "tutor info added successfully",
      result,
    });
  } catch (error) {
    console.error("CREATE TUTOR ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to add tutor",
    });
  }
};
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await tutorServices.getAllTutors();
    res.status(200).json({
      success: true,
      message: "tutors retrieved successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutors",
      error,
    });
  }
};
const updateTutor = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
      });
    }
    const result = await tutorServices.updateTutor(body,user);
    res.status(200).json({
      success: true,
      message: "Tutor Profile Updated Successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutors",
      error,
    });
  }
};
const updateAvailability = async (req: Request, res: Response) =>{
  try {
    const { avilability_slot } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }


     if (!avilability_slot) {
      return res.status(400).json({
        success: false,
        message: "Availability slot is required",
      });
    }
   const result = await tutorServices.updateAvailability(
      avilability_slot,
      user
    );

    res.status(200).json({
      success: true,
      message: "Availability Updated Successfully",
      result,
    });

  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error,
    });
  }
}

export const tutorController = {
  createTutorProfile,
  getAllTutors,
  updateTutor,updateAvailability
};
