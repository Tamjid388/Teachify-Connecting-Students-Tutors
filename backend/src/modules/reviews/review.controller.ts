import { Request, Response } from "express";
import { reviewServices } from "./review.service";

const createReview= async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
      });
    }
    const result = await reviewServices.createReview()
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      result,
    });
  } catch (error) {
    console.error("CREATE Review ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Failed to Add Review",
    });
  }
};


export const reviewController={
    createReview
}
