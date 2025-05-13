import express from "express";
import UserController from "../../controllers/user/user.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import { validateUserUpdate } from "../../validation/user/user.validator";
import {
  expressValidator,
  requiredUserIdMiddleware,
} from "../../middlewares/validator.middleware";
import {
  adminAuthorizationMiddlewares,
  userAuthorizationMiddlewares,
} from "../../utils/authorizationRole.util";

const controller = UserController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update user
 *     description: Update user details
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/components/schemas/UserUpdateDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update",
  ...userAuthorizationMiddlewares,
  expressValidator(validateUserUpdate),
  asyncHandler(controller.updateUser.bind(controller))
);

/**
 * @swagger
 * /user/get/{userId}:
 *   get:
 *     summary: Get user
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [User]
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:userId",
  ...userAuthorizationMiddlewares,
  requiredUserIdMiddleware(),
  asyncHandler(controller.getUser.bind(controller))
);

/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: Get user
 *     description: Get all the user details
 *     tags: [User]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all",
  ...adminAuthorizationMiddlewares,
  asyncHandler(controller.getAllUsers.bind(controller))
);

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get user
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [User]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
// Get user model
router.get(
  "/me",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getMe.bind(controller))
);

export default router;
