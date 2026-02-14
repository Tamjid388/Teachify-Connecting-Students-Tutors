import { Request, Response } from "express";
import { reviewServices } from "./review.service";

const createReview= async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not Found",
        success: false,
      });
    }
    const result = await reviewServices.createReview(userId,body)
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      result,
    });
  } catch (error:any) {
    console.error("CREATE Review ERROR 👉", error);
    res.status(500).json({
      success: false,
      error:error.message,
      message: "Failed to Add Review",
    });
  }
};


export const reviewController={
    createReview
}
