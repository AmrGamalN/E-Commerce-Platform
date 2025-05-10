import express from "express";
import { asyncHandler } from "../../middlewares/handleError";
import CategoryController from "../../controllers/commerce/category.controller";
import { validateParamMiddleware } from "../../middlewares/validatorMiddleware";
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
 *         $ref: '#/components/responses/CategoryResponse'
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
 *         $ref: '#/components/responses/CategoryResponse'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  asyncHandler(validateParamMiddleware()),
  asyncHandler(controller.getCategoryById.bind(controller))
);

export default router;
