import express from "express";
import LoginController from "../../controllers/auth/login.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import TokenMiddleware from "../../middlewares/authentication.middleware";
import { expressValidator } from "../../middlewares/validator.middleware";
import {
  validateLoginByEmail,
  validateLoginByPhone,
} from "../../validation/auth/login.validator";
import { validateCode2AF } from "../../validation/user/security.validator";
const tokenMiddleware = TokenMiddleware.getInstance();
const controller = LoginController.getInstance();
const role = ["user", "admin", "manager"];
const router = express.Router();

/**
 * @swagger
 * /auth/login/email:
 *   post:
 *     summary: Login user with email and password
 *     description: Authenticate a user using email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/LoginEmailDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/email",
  asyncHandler(expressValidator(validateLoginByEmail)),
  asyncHandler(controller.loginByEmail.bind(controller))
);

/**
 * @swagger
 * /auth/login/phone:
 *   post:
 *     summary: Login user with phone number and password
 *     description: Authenticate a user using phone number and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/LoginPhoneDto'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
// Login by phone
router.post(
  "/phone",
  asyncHandler(expressValidator(validateLoginByPhone)),
  asyncHandler(controller.loginByPhone.bind(controller))
);

/**
 * @swagger
 * /auth/login/2fa:
 *   post:
 *     summary: Verify two-factor authentication after login
 *     description: Verify a user's OTP code for 2FA authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twoFactorCode:
 *                 type: string
 *                 description: "The 6-digit OTP code"
 *                 example: "123456"
 *                 pattern: "^[0-9]{6}$"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/2fa",
  tokenMiddleware.authorizationMiddleware(role),
  asyncHandler(expressValidator(validateCode2AF)),
  asyncHandler(controller.verifyTwoFactorAuthentication.bind(controller))
);

/**
 * @swagger
 * /auth/login/facebook:
 *   post:
 *     summary: Login user by facebook
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
 *                 description: "idToken"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/facebook",
  asyncHandler(tokenMiddleware.verifyIdTokenFirebase),
  asyncHandler(controller.loginByFacebook.bind(controller))
);

/**
 * @swagger
 * /auth/login/google:
 *   post:
 *     summary: Login user by google
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
 *                 description: "idToken"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/google",
  asyncHandler(tokenMiddleware.verifyIdTokenFirebase),
  asyncHandler(controller.loginByGoogle.bind(controller))
);
export default router;
