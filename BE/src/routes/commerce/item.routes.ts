import express from "express";
import ItemController from "../../controllers/commerce/item.controller";
import {
  parseFieldsMiddleware,
  parserImagesMiddleware,
} from "../../middlewares/parser.middleware";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../../middlewares/validator.middleware";
import MiddlewareUploadFile from "../../middlewares/uploadFile.middleware";
import {
  validateItemAdd,
  validateItemUpdate,
} from "../../validation/commerce/item.validator";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
const middlewareUploadFile = MiddlewareUploadFile.getInstance();
const controller = ItemController.getControllerInstance();
const router = express.Router();

/**
 * @swagger
 * /item/count:
 *   get:
 *     summary: Get count of items
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryParam'
 *       - $ref: '#/components/parameters/SubItemParam'
 *       - $ref: '#/components/parameters/BrandParam'
 *       - $ref: '#/components/parameters/TypeParam'
 *       - $ref: '#/components/parameters/DiscountParam'
 *       - $ref: '#/components/parameters/SizeParam'
 *       - $ref: '#/components/parameters/MaterialParam'
 *       - $ref: '#/components/parameters/ColorParam'
 *       - $ref: '#/components/parameters/LocationParam'
 *       - $ref: '#/components/parameters/ConditionParam'
 *       - $ref: '#/components/parameters/AllowNegotiateParam'
 *       - $ref: '#/components/parameters/PriceMinParam'
 *       - $ref: '#/components/parameters/PriceMaxParam'
 *       - $ref: '#/components/parameters/CreatedFromParam'
 *       - $ref: '#/components/parameters/CreatedToParam'
 *       - $ref: '#/components/parameters/CommunicationsParam'
 *       - $ref: '#/components/parameters/AvgRatingParam'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ItemResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.countItems.bind(controller))
);

/**
 * @swagger
 * /item:
 *   get:
 *     summary: Get all items by pagination
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/CategoryParam'
 *       - $ref: '#/components/parameters/SubItemParam'
 *       - $ref: '#/components/parameters/BrandParam'
 *       - $ref: '#/components/parameters/TypeParam'
 *       - $ref: '#/components/parameters/DiscountParam'
 *       - $ref: '#/components/parameters/SizeParam'
 *       - $ref: '#/components/parameters/MaterialParam'
 *       - $ref: '#/components/parameters/ColorParam'
 *       - $ref: '#/components/parameters/LocationParam'
 *       - $ref: '#/components/parameters/ConditionParam'
 *       - $ref: '#/components/parameters/AllowNegotiateParam'
 *       - $ref: '#/components/parameters/PriceMinParam'
 *       - $ref: '#/components/parameters/PriceMaxParam'
 *       - $ref: '#/components/parameters/CreatedFromParam'
 *       - $ref: '#/components/parameters/CreatedToParam'
 *       - $ref: '#/components/parameters/CommunicationsParam'
 *       - $ref: '#/components/parameters/AvgRatingParam'
 *       - $ref: '#/components/parameters/ItemSortPrice'
 *       - $ref: '#/components/parameters/ItemSortCreatedAt'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ItemResponse'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", asyncHandler(controller.getAllItem.bind(controller)));

/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Get item by id
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ItemResponse'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getItem.bind(controller))
);

/**
 * @swagger
 * /item/category/{id}:
 *   get:
 *     summary: Get items by category id
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ItemResponse'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/category/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getItemByCategoryId.bind(controller))
);

/**
 * @swagger
 * /item/sub-category/{id}:
 *   get:
 *     summary: Get items by subcategory id
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ItemResponse'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/sub-category/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getItemBySubCategoryId.bind(controller))
);

/**
 * @swagger
 * /item/add:
 *   post:
 *     summary: Add item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ItemPostDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Unauthorized
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
  expressValidator(validateItemAdd),
  asyncHandler(controller.addItem.bind(controller))
);

/**
 * @swagger
 * /item/delete/{id}:
 *   delete:
 *     summary: delete item by id
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Item not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.deleteItem.bind(controller))
);

/**
 * @swagger
 * /item/update/{id}:
 *   put:
 *     summary: Update item
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *       - name: prefix
 *         in: query
 *         required: false
 *         description: A unique prefix used to group uploaded images
 *         example: 58b287c5-a2b8-47e2-9194-1824dae42418
 *         schema:
 *           type: string
 *       - name: keys-images-unchanged
 *         in: header
 *         required: false
 *         description: Image keys to be updated from storage.
 *         schema:
 *           type: string
 *         example: '[{"key":"58b287c5-a2b8-47e2-9194-1824dae42418/1744494527991-58b287c5-a2b8-47e2-9194-1824dae42418-fb_img_1658325664102.jpg","angle":99999},{"key":"58b287c5-a2b8-47e2-9194-1824dae42418/1744494527998-58b287c5-a2b8-47e2-9194-1824dae42418-fb_img_1658325664102.jpg","angle":180},{"key":"58b287c5-a2b8-47e2-9194-1824dae42418/1744494528022-58b287c5-a2b8-47e2-9194-1824dae42418-fb_img_1658325664102.jpg","angle":270}]'
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
 *         description: Item not found
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
  expressValidator(validateItemUpdate),
  asyncHandler(controller.updateItem.bind(controller))
);

/**
 * @swagger
 * /item/image/delete/{id}:
 *   delete:
 *     summary: Delete image
 *     tags: [Item]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deleteImageKeys:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Image keys to be deleted from storage.
 *                   nullable: true
 *                   example: 58b287c5-a2b8-47e2-9194-1824dae42418/1744502360800-58b287c5-a2b8-47e2-9194-1824dae42418-fb_img_1658325664102.jpg
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/image/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  middlewareUploadFile.deleteItemImage,
  asyncHandler(controller.deleteImages.bind(controller))
);

export default router;
