import express from "express";
import ReviewController from "../../controllers/commerce/review.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../../middlewares/validator.middleware";
import { reviewValidator } from "../../validation/commerce/review.validator";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
const controller = ReviewController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /item/review/count/{id}:
 *   get:
 *     summary: Get count of review
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *       - $ref: '#/components/parameters/TitleParam'
 *       - $ref: '#/components/parameters/RateParam'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.countReview.bind(controller))
);

/**
 * @swagger
 * /item/review/add:
 *   post:
 *     summary: Add review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ReviewAddDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Error to add review
 *       403:
 *         description: Unauthorized
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  ...userAuthorizationMiddlewares,
  expressValidator(reviewValidator),
  asyncHandler(controller.addReview.bind(controller))
);

/**
 * @swagger
 * /item/review/update/{id}:
 *   put:
 *     summary: Get count of review
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ReviewUpdateDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ReviewResponse'
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  expressValidator(reviewValidator),
  asyncHandler(controller.updateReview.bind(controller))
);

/**
 * @swagger
 * /item/review/delete/{id}:
 *   delete:
 *     summary: Delete review by id
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.deleteReview.bind(controller))
);

/**
 * @swagger
 * /item/review/average/{id}:
 *   get:
 *     summary: Get average review by item id
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/average/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getReviewAverage.bind(controller))
);

/**
 * @swagger
 * /item/review/get/{id}:
 *   get:
 *     summary: Get review by id
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ReviewResponse'
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getReview.bind(controller))
);

/**
 * @swagger
 * /item/review/{id}:
 *   get:
 *     summary: Get all review by item ids
 *     tags: [Review]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/TitleParam'
 *       - $ref: '#/components/parameters/RateParam'
 *       - $ref: '#/components/parameters/ReviewSortCreatedAt'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ReviewResponse'
 *       404:
 *         description: Review not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", asyncHandler(controller.getAllReview.bind(controller)));

export default router;
