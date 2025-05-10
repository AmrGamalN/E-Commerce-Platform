import multer, { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";
import multerS3 from "multer-s3";
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { asyncHandler } from "./handleError";
import { v4 as uuidv4 } from "uuid";
import { bucketName, s3 } from "../config/client-s3";

declare global {
  namespace Express {
    interface Request {
      fileIndex?: number[];
      s3Response?: any;
      generatedIndex?: number;
      maxCount?: number;
      prefixS3?: string;
      keysImageUnchanged?: object[];
      folder?: string;
    }
  }
}

class MiddlewareUploadFile {
  private static Instance: MiddlewareUploadFile;
  public static getInstance() {
    if (!MiddlewareUploadFile.Instance) {
      MiddlewareUploadFile.Instance = new MiddlewareUploadFile();
    }
    return MiddlewareUploadFile.Instance;
  }

  // Multer3
  private upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req: Request, file, cb) => {
        // Create new image when update
        if (req.fileIndex) {
          return cb(
            null,
            `${req.folder}/${req.query.prefix}/${Date.now()}-${
              req.query.prefix
            }-${file.originalname.toLowerCase()}`
          );
        }

        // Create new image when add
        if (!req.prefixS3) {
          req.prefixS3 = uuidv4();
        }
        const folder = ["profiles", "drafts", "items"];
        const key = folder.includes(req.folder!)
          ? req.query.prefix ?? req.prefixS3
          : req.prefixS3;
        return cb(
          null,
          `${
            req.folder
          }/${key}/${Date.now()}-${key}-${file.originalname.toLowerCase()}`
        );
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
        return cb(
          new Error("Only jpg and png images are allowed!") as unknown as null,
          false
        );
      }

      // Skip image when update item
      if (!req.generatedIndex) req.generatedIndex = 0;
      if (req.fileIndex && req.fileIndex[req.generatedIndex] == 1) {
        req.generatedIndex++;
        return cb(null, false);
      }
      req.generatedIndex++;
      return cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  // Middleware: Upload image
  private uploadFile =
    (uploadMiddleware: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
      uploadMiddleware(req, res, async (err: any) => {
        if (err instanceof MulterError) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Upload failed",
            error: err.message,
          });
        }
        return next();
      });
    };

  // Middleware: Detect S3 folder based on request URL
  detectS3Folder = (req: Request, res: Response, next: NextFunction) => {
    let folder = "items";
    if (req.originalUrl.includes("draft")) {
      folder = "drafts";
    } else if (req.originalUrl.includes("profile")) {
      folder = "profiles";
    }
    req.maxCount = req.folder == "profiles" ? 2 : 5;
    req.folder = folder;
    return next();
  };

  // Middleware: Count images
  countImagesBeforeUpload = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: `${req.folder}/${req.query.prefix}/`,
      });

      const s3Response = await s3.send(command);
      const remainingSpace =
        Number(req.maxCount) - Number(s3Response.Contents?.length);

      if (remainingSpace <= 0) {
        return res.status(400).json({
          message: `You cannot upload more than ${
            req.maxCount
          } images. You currently have ${Number(
            s3Response.Contents?.length
          )} images.`,
        });
      }
      req.s3Response = s3Response?.Contents;
      return next();
    }
  );

  // Middleware: Skip uploading images that haven't changed
  markUnchangedImages = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const fileIndex: number[] = [];

      const s3Keys = req.s3Response?.map((item: any) => item.Key) || [];
      const unchangedKeys = JSON.parse(
        (req.headers["keys-images-unchanged"] as string) || "[]"
      );

      s3Keys.forEach((key: string, index: number) => {
        if (unchangedKeys[index]?.key === key) {
          fileIndex[index] = 1;
        }
      });

      req.keysImageUnchanged = unchangedKeys;
      req.fileIndex = fileIndex;
      next();
    }
  );

  // Middleware: Delete image from s3
  deleteItemImage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      await Promise.all(
        req.body.deleteImageKeys.map((key: string) =>
          s3.send(
            new DeleteObjectCommand({
              Bucket: bucketName,
              Key: key,
            })
          )
        )
      );
      return next();
    }
  );

  uploadUserImage = asyncHandler(
    this.uploadFile(
      this.upload.fields([
        { maxCount: 1, name: "profileImage" },
        { maxCount: 1, name: "coverImage" },
      ])
    )
  );

  uploadItemImages = asyncHandler(
    this.uploadFile(this.upload.fields([{ name: "itemImages", maxCount: 5 }]))
  );
}
export default MiddlewareUploadFile;
