import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const addSubjects = async (req: Request, res: Response) => {
  try {
    const body = req.body;
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
export const categoryController = { addSubjects };
