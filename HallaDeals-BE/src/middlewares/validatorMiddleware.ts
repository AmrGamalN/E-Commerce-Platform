import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  params: {
    userId?: string | null;
    [key: string]: any;
  };
}

export const expressValidator = (validators: any[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    for (const validator of validators) {
      await validator.run(req);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (!res.headersSent) {
        res.status(400).json({
          success: false,
          status: 400,
          message: "Validation failed",
          errors: errors.array().map((err) => ({
            field: (err as any).path || "unknown",
            message: err.msg,
            type: err.type,
          })),
        });
        return;
      }
    }
   return next();
  };
};

const validateParam = (
  paramKey: string,
  typeDB: "mongoDb" | "firebase",
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const param = req.params?.[paramKey];

  if (!param) {
    if (req.curUser?.userId) {
      req.body.id = { userId: req.curUser.userId };
      return next();
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const regexPattern =
    typeDB === "mongoDb" ? `^[a-fA-F0-9]{24}$` : `^[a-zA-Z0-9]{28}$`;
  const regex = new RegExp(regexPattern);
  if (!regex.test(param)) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  if (typeDB === "firebase") {
    req.body.id = { userId: param };
    return next();
  }
  req.body.id = { _id: param };
  return next();
};

export const validateParamMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return validateParam("id", "mongoDb", req, res, next);
  };
};

export const validateQueryFirebaseMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return validateParam("userId", "firebase", req, res, next);
  };
};
