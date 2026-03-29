import { auth } from "../lib/auth";
const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Your Are Not Authorized",
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
            };
            console.log("User Role:", req.user.role);
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden Access ,You dont have permission",
                });
            }
            next();
        }
        catch (error) {
            console.error("Authentication midddleware failed");
        }
    };
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map