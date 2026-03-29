const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API endpoint does not exist",
            },
        ],
    });
};
export default notFoundHandler;
//# sourceMappingURL=not-found.js.map