import express from "express";
import DraftItemController from "../../controllers/commerce/draftItem.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import MiddlewareUploadFile from "../../middlewares/uploadFile.middleware";
import {
  parseFieldsMiddleware,
  parserImagesMiddleware,
} from "../../middlewares/parser.middleware";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
import { requiredParamMiddleware } from "../../middlewares/validator.middleware";
const middlewareUploadFile = MiddlewareUploadFile.getInstance();
const controller = DraftItemController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /item/draft/count:
 *   get:
 *     summary: Get count of draft items
 *     tags: [DraftItem]
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
router.get(
  "/count",
  ...userAuthorizationMiddlewares,
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
  ...userAuthorizationMiddlewares,
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
 *         $ref: '#/components/schemas/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
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
  "/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
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
 *         $ref: '#/components/schemas/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
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
 *         $ref: '#/components/schemas/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: draft item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getAllDraftItem.bind(controller))
);

export default router;
