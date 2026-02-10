import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
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