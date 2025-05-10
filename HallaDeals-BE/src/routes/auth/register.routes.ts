import express from "express";
import RegisterController from "../../controllers/auth/register.controller";
import { asyncHandler } from "../../middlewares/handleError";
import { expressValidator } from "../../middlewares/validatorMiddleware";
import { registerValidator } from "../../validation/auth/register.validator";
const controller = RegisterController.getInstance();
import TokenMiddleware from "../../middlewares/token.middleware";
const tokenMiddleware = TokenMiddleware.getInstance();
const router = express.Router();

/**
 * @swagger
 * /auth/register/email:
 *   post:
 *     summary: Register a new user by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RegisterResponse'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/email",
  asyncHandler(expressValidator(registerValidator)),
  asyncHandler(controller.register.bind(controller))
);

/**
 * @swagger
 * /auth/register/facebook:
 *   post:
 *     summary: Register a new user by Facebook
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Facebook ID Token
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RegisterResponse'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/facebook",
  asyncHandler(tokenMiddleware.verifyIdTokenFirebase),
  asyncHandler(controller.registerByFacebook.bind(controller))
);

/**
 * @swagger
 * /auth/register/google:
 *   post:
 *     summary: Register a new user by Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID Token
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RegisterResponse'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/google",
  asyncHandler(tokenMiddleware.verifyIdTokenFirebase),
  asyncHandler(controller.registerByGoogle.bind(controller))
);

export default router;
