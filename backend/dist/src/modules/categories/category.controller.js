import { categoryServices } from "./category.service";
const addSubjects = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await categoryServices.addSubjects(body);
        return res.status(201).json({
            success: true,
            messsage: "Subjects Added Successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            messsage: "Failed to Add Subjects",
        });
    }
};
const getAllSubjects = async (req, res) => {
    try {
        const result = await categoryServices.getAllSubjects();
        return res.status(201).json({
            success: true,
            messsage: "Subjects Fetched Successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            messsage: "Failed to Get Subjects",
        });
    }
};
const assignSubject = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: error.message || "Failed to Assign Subjects",
        });
    }
};
export const categoryController = {
    addSubjects,
    assignSubject,
    getAllSubjects,
};
//# sourceMappingURL=category.controller.js.map