import express from "express";
import WishlistController from "../../controllers/commerce/wishlist.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../../middlewares/validator.middleware";
import { wishlistValidator } from "../../validation/commerce/wishlist.validator";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
const controller = WishlistController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /item/wishlist/count:
 *   get:
 *     summary: Get count of wishlist
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.countWishlist.bind(controller))
);

/**
 * @swagger
 * /item/wishlist/add:
 *   post:
 *     summary: Add wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/WishlistAddDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Error to add wishlist
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
  expressValidator(wishlistValidator),
  asyncHandler(controller.addWishlist.bind(controller))
);

/**
 * @swagger
 * /item/wishlist/delete/{id}:
 *   delete:
 *     summary: Delete wishlist by id
 *     tags: [Wishlist]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Wishlist not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.deleteWishlist.bind(controller))
);
/**
 * @swagger
 * /item/wishlist/clear:
 *   delete:
 *     summary: Clear wishlist
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Wishlist not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/clear",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.clearWishlist.bind(controller))
);

/**
 * @swagger
 * /item/wishlist/get/{id}:
 *   get:
 *     summary: Get wishlist by id
 *     tags: [Wishlist]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/WishlistResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.getWishlist.bind(controller))
);

/**
 * @swagger
 * /item/wishlist/get-all:
 *   get:
 *     summary: Get all wishlist for user
 *     tags: [Wishlist]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/WishlistResponse'
 *       404:
 *         description: Wishlist not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getAllWishlist.bind(controller))
);

export default router;
