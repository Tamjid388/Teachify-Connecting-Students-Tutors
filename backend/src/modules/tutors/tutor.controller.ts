import { Request, Response } from "express";
import { tutorServices } from "./tutor.service";
import { success } from "better-auth";

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


export const addAvailabilitySlots = async (req: Request, res: Response) =>{
try {
  const userId=req.user?.id
  const slots=req.body.slots
  if (!userId) return res.status(401).json({ message: "User ID required" });

  if(!slots || !Array.isArray(slots) || slots.length===0){
    return res.status(400).json({ message: "Slots are required" });
  }
  const createSlots=await  tutorServices.createSlots(slots,userId);
    return res.status(201).json({
      success: true,
      message: "Slots created successfully",
      data: createSlots,
    });
} catch (err: any) {
  res.status(400).json({ success: false, message: err.message });
}
}


export const getAvailabilitySlots = async (req: Request, res: Response) => {
  try {
    const tutorId = req.query.tutorId as string 
    const slots = await tutorServices.getSlots(tutorId);

    return res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch slots",
    });
  }
};
const getTutorById = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
if(!tutorId || Array.isArray(tutorId)){
  return res.status(404).json({
    success:false,
    message:"Valid tutorId is required"
  })
}
    const tutor = await tutorServices.getTutorById(tutorId);

    if (!tutor ) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (error) {
    console.error("GET TUTOR ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to get tutor info",
    });
  }
};

export const tutorController = {
  createTutorProfile,
  getAllTutors,
  updateTutor,updateAvailability,addAvailabilitySlots, getAvailabilitySlots,getTutorById 
};
