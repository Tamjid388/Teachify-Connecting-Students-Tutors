import { reviewServices } from "./review.service";
const createReview = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "User not Found",
                success: false,
            });
        }
        const result = await reviewServices.createReview(userId, body);
        res.status(200).json({
            success: true,
            message: "Review added successfully",
            result,
        });
    }
    catch (error) {
        console.error("CREATE Review ERROR 👉", error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to Add Review",
        });
    }
};
const getReview = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await reviewServices.getReview(id);
        res.status(200).json({
            success: true,
            message: "Review retrieved successfully",
            result,
        });
    }
    catch (error) {
        console.error("GET Review ERROR 👉", error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to Retrieve Review",
        });
    }
};
export const reviewController = {
    createReview,
    getReview
};
//# sourceMappingURL=review.controller.js.map