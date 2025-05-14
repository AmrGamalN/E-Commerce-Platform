import { Request, Response, NextFunction } from "express";

type funcExpress = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

// It wraps functions that handle error
export const asyncHandler = (func: funcExpress) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await (func as funcExpress)(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
};

// Error handling middleware for express
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
};
