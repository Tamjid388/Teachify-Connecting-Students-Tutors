import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const addSubjects = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
    const result = await categoryServices.addSubjects(body);

    return res.status(201).json({
      success: true,
      messsage: "Subjects Added Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Failed to Add Subjects",
    });
  }
};

const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const result = await categoryServices.getAllSubjects();

    return res.status(201).json({
      success: true,
      messsage: "Subjects Fetched Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Failed to Get Subjects",
    });
  }
};
const assignSubject = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
    const tutorId = req.user?.id;
    if (!tutorId) {
      return res.status(404).json({
        message: "Tutor Id Missing",
      });
    }
    const result = await categoryServices.assignSubject(body, tutorId);
    return res.status(201).json({
      success: true,
      message: "Subjects Assigned Successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: error.message||"Failed to Assign Subjects",
    });
  }
};
export const categoryController = {
  addSubjects,
  assignSubject,
  getAllSubjects,
};
