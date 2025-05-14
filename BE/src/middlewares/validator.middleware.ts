import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./handleError.middleware";
import { CustomError } from "../utils/customError";
interface CustomRequest extends Request {
  params: {
    userId?: string | null;
    [key: string]: any;
  };
}

export const expressValidator = (validators: any[]) => {
  return asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      for (const validator of validators) {
        await validator?.run(req);
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (!res.headersSent) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Validation failed",
            errors: errors.array().map((err) => ({
              field: (err as any).path || "unknown",
              message: err.msg,
              type: err.type,
            })),
          });
        }
      }
      return next();
    }
  );
};

//  Validate params id & required

export const requiredParamMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.params?.id || !/^[a-fA-F0-9]{24}$/.test(req.params.id))
      throw new CustomError("Not found", "NotFound", false, 404);
    return next();
  };
};

// Validate user id & required
export const requiredUserIdMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.userId || !/^[a-zA-Z0-9]{28}$/.test(req.params.userId))
      throw new CustomError("Not found", "NotFound", false, 404);
    return next();
  };
};
