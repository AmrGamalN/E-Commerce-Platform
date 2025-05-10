import express from "express";
import UserController from "../../controllers/user/user.controller";
import { asyncHandler } from "../../middlewares/handleError";
import { validateUserUpdate } from "../../validation/user/user.validator";
import {
  expressValidator,
  validateQueryFirebaseMiddleware,
} from "../../middlewares/validatorMiddleware";
const controller = UserController.getInstance();
import TokenMiddleware from "../../middlewares/token.middleware";
const tokenMiddleware = TokenMiddleware.getInstance();
const role = ["user", "admin", "manager"];
const router = express.Router();

const commonMiddlewares = [
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
];

/**
 * @swagger
 * /user/update/{userId}:
 *   put:
 *     summary: Update user
 *     description: Update user details
 *     tags: [User]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdComponents'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              - $ref: '#/components/schemas/ProfileUpdateDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:userId?",
  ...commonMiddlewares,
  asyncHandler(validateQueryFirebaseMiddleware()),
  asyncHandler(expressValidator(validateUserUpdate)),
  asyncHandler(controller.updateUser.bind(controller))
);

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get user
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [User]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdComponents'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:userId?",
  ...commonMiddlewares,
  asyncHandler(validateQueryFirebaseMiddleware()),
  asyncHandler(controller.getUser.bind(controller))
);

/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: Get user
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [User]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all",
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(["admin", "manager"])),
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
 *         $ref: '#/components/responses/UserResponse'
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
  ...commonMiddlewares,
  asyncHandler(controller.getMe.bind(controller))
);

export default router;
