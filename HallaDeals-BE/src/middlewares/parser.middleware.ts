import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
const parserFieldArray = ["paymentOptions", "communications", "color"];
const parserFieldBoolean = ["isSavedForLater", "allowNegotiate", "isDiscount"];
const parserFieldNumber = ["price", "discount"];
const parserImages = ["itemImages"];

export const parseFieldsMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let hasError = false;
    for (const field of Object.keys(req.body)) {
      const value = req.body[field.trim()];
      if (value && typeof value === "string") {
        try {
          if (parserFieldArray.includes(field)) {
            req.body[field] = value?.split(",");
          }
          if (parserFieldNumber.includes(field)) {
            req.body[field] = Number(value);
          }
          if (parserFieldBoolean.includes(field)) {
            req.body[field] = Boolean(value);
          }
        } catch (err) {
          if (!hasError) {
            hasError = true;
            new CustomError(
              `Invalid field "${field}"`,
              "BadRequest",
              false,
              400
            );
          }
        }
      }
    }
    return next();
  };
};

export const parserImagesMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.files) {
      return next();
    }
    for (const field in req.files) {
      if (parserImages.includes(field)) {
        const images = req.files as {
          [fieldname: string]: Express.MulterS3.File[];
        };
        const rotateDegrees: number[] = req.body.angles;
        req.body[field] = images[field]?.map((file, index) => ({
          imageUrl: file.location || "",
          key: file.key,
          angles: Number(rotateDegrees[index]) || 0,
        }));
      }
    }
    return next();
  };
};

export const userImageParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadedFiles = req.files as {
    [fieldname: string]: Express.MulterS3.File[];
  };

  if (uploadedFiles?.profileImage) {
    req.body.profileImage = {
      imageUrl: uploadedFiles.profileImage[0]?.location,
      key: uploadedFiles.profileImage[0]?.key,
    };
  }

  if (uploadedFiles?.coverImage) {
    req.body.coverImage = {
      imageUrl: uploadedFiles.coverImage[0]?.location,
      key: uploadedFiles.coverImage[0]?.key,
    };
  }
  req.body.prefixS3 = req?.prefixS3;
  req.body.paymentOptions = req.body.paymentOptions?.split(",");
  req.body.allowedToShow = req.body.allowedToShow?.split(",");
  next();
};
