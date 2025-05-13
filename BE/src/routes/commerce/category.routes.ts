import express from "express";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import CategoryController from "../../controllers/commerce/category.controller";
import { requiredParamMiddleware } from "../../middlewares/validator.middleware";
const router = express.Router();
const controller = CategoryController.getControllerInstance();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", asyncHandler(controller.getAllCategory.bind(controller)));

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get Category by id
 *     tags: [Category]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  requiredParamMiddleware(),
  asyncHandler(controller.getCategoryById.bind(controller))
);

export default router;
