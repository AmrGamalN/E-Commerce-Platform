import express from "express";
import SecurityController from "../../controllers/user/security.controller";
import {
  expressValidator,
  validateQueryFirebaseMiddleware,
  validateParamMiddleware,
} from "../../middlewares/validatorMiddleware";
import { asyncHandler } from "../../middlewares/handleError";
import {
  validateUserSecurityUpdate,
  validateSecurityEmail,
  validateSecurityUpdatePass,
  validateSecurityStatus,
  validateCode2AF,
} from "../../validation/user/security.validator";
import TokenMiddleware from "../../middlewares/token.middleware";
const tokenMiddleware = TokenMiddleware.getInstance();
const controller = SecurityController.getInstance();
const router = express.Router();
const role = ["user", "admin", "manager"];

const commonMiddlewares = [
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(["admin", "manager"])),
];

/**
 * @swagger
 * /user/security/update/{userId}:
 *   put:
 *     summary: Update user security settings
 *     tags: [Security]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdComponents'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             - $ref: '#/components/schemas/SecurityUpdateDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SecurityResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Security not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:userId?",
  ...commonMiddlewares,
  asyncHandler(validateQueryFirebaseMiddleware()),
  asyncHandler(expressValidator(validateUserSecurityUpdate)),
  asyncHandler(controller.updateSecurity.bind(controller))
);

/**
 * @swagger
 * /user/security/count:
 *   get:
 *     summary: Get count of security-related data
 *     tags: [Security]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...commonMiddlewares,
  asyncHandler(controller.countSecurity.bind(controller))
);

/**
 * @swagger
 * /user/security/block-delete:
 *   post:
 *     summary: Block or delete a user account
 *     tags: [Security]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdComponents'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            - type: object
 *              properties:
 *                block:
 *                  type: boolean
 *                  default: false
 *                  description: "Set to true to block the user account (optional)"
 *                delete:
 *                  type: boolean
 *                  default: false
 *                  description: "Set to true to delete the user account (optional)"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/block-delete/:userId?",
  ...commonMiddlewares,
  asyncHandler(validateQueryFirebaseMiddleware()),
  asyncHandler(expressValidator(validateSecurityStatus)),
  asyncHandler(controller.deleteBlockUser.bind(controller))
);

/**
 * @swagger
 * /user/security/reset:
 *   post:
 *     summary: Request a password reset
 *     tags: [Security]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "User's email address to receive reset instructions"
 *                 example: "amr5179520@gmail.com"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/reset",
  asyncHandler(expressValidator(validateSecurityEmail)),
  asyncHandler(controller.resetPassword.bind(controller))
);

/**
 * @swagger
 * /user/security/update-password:
 *   post:
 *     summary: Update the user's password
 *     tags: [Security]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "New password for the user"
 *                 example: "Amr01200812638@"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/update-password",
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
  asyncHandler(expressValidator(validateSecurityUpdatePass)),
  asyncHandler(controller.updatePassword.bind(controller))
);

/**
 * @swagger
 * /user/security/request-email-verification:
 *   post:
 *     summary: Send a verification email to confirm the user's email address
 *     tags: [Security]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "User's email address to receive the verification email"
 *                 example: "amr5179520@gmail.com"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/request-email-verification",
  asyncHandler(expressValidator(validateSecurityEmail)),
  asyncHandler(controller.sendVerificationEmail.bind(controller))
);

/**
 * @swagger
 * /user/security/generate/2fa:
 *   post:
 *     summary: Generate a QR code for two-factor authentication (2FA) Use it from postman
 *     tags: [Security]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/generate/2fa",
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
  asyncHandler(controller.generateTwoFactorAuth.bind(controller))
);

/**
 * @swagger
 * /user/security/confirm/2fa:
 *   post:
 *     summary: Confirm two-factor authentication (2FA) code
 *     tags: [Security]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twoFactorCode:
 *                 type: string
 *                 description: "The 6-digit OTP code for 2FA verification"
 *                 example: "123456"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/confirm/2fa",
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
  asyncHandler(expressValidator(validateCode2AF)),
  asyncHandler(controller.verifyTwoFactorAuth.bind(controller))
);

/**
 * @swagger
 * /user/security/get:
 *   get:
 *     summary: Get user security
 *     description: Retrieve the Security details of the authenticated user
 *     tags: [Security]
 *     parameters:
 *       - $ref: '#/components/parameters/userIdComponents'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SecurityResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
  asyncHandler(controller.getSecurity.bind(controller))
);

/**
 * @swagger
 * /user/security/get-all:
 *   get:
 *     summary: Get user security
 *     description: Retrieve the Security details of the authenticated user
 *     tags: [Security]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SecurityResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all",
  ...commonMiddlewares,
  asyncHandler(controller.getAllSecurities.bind(controller))
);

export default router;
