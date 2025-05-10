import express from "express";
import DraftItemController from "../../controllers/commerce/draftItem.controller";
import { asyncHandler } from "../../middlewares/handleError";
import TokenMiddleware from "../../middlewares/token.middleware";
const role = ["user", "admin", "manager"];
import MiddlewareUploadFile from "../../middlewares/uploadFile.middleware";
import {
  validateParamMiddleware,
} from "../../middlewares/validatorMiddleware";
import { parseFieldsMiddleware, parserImagesMiddleware } from "../../middlewares/parser.middleware";
const middlewareUploadFile = MiddlewareUploadFile.getInstance();
const tokenMiddleware = TokenMiddleware.getInstance();
const controller = DraftItemController.getInstance();
const router = express.Router();
const commonMiddlewares = [
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
];

/**
 * @swagger
 * /item/draft/count:
 *   get:
 *     summary: Get count of draft items
 *     tags: [DraftItem]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...commonMiddlewares,
  asyncHandler(controller.countDraftItems.bind(controller))
);

/**
 * @swagger
 * /item/draft/add:
 *   post:
 *     summary: Add draft item
 *     tags: [DraftItem]
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *            $ref: '#/components/schemas/ItemPostDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  ...commonMiddlewares,
  middlewareUploadFile.detectS3Folder,
  middlewareUploadFile.uploadItemImages,
  parseFieldsMiddleware(),
  parserImagesMiddleware(),
  asyncHandler(controller.addDraftItem.bind(controller))
);

/**
 * @swagger
 * /item/draft/update/{id}:
 *   put:
 *     summary: Update draft item
 *     tags: [DraftItem]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ItemPostDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
  middlewareUploadFile.detectS3Folder,
  middlewareUploadFile.countImagesBeforeUpload,
  middlewareUploadFile.markUnchangedImages,
  middlewareUploadFile.uploadItemImages,
  parseFieldsMiddleware(),
  parserImagesMiddleware(),
  asyncHandler(controller.updateDraftItem.bind(controller))
);

/**
 * @swagger
 * /item/draft/delete/{id}:
 *   delete:
 *     summary: Delete draft item
 *     tags: [DraftItem]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
  asyncHandler(controller.deleteDraftItem.bind(controller))
);

/**
 * @swagger
 * /item/draft/get/{id}:
 *   get:
 *     summary: Get draft item by ID
 *     tags: [DraftItem]
 *     parameters:
 *      - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
  asyncHandler(controller.getDraftItem.bind(controller))
);

/**
 * @swagger
 * /item/draft:
 *   get:
 *     summary: Get all draft items
 *     tags: [DraftItem]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  ...commonMiddlewares,
  asyncHandler(controller.getAllDraftItem.bind(controller))
);

export default router;
