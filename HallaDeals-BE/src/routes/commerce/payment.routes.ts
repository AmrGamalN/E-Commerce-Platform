import express from "express";
import PaymentController from "../../controllers/commerce/payment.controller";
import { asyncHandler } from "../../middlewares/handleError";
import { expressValidator } from "../../middlewares/validatorMiddleware";
import TokenMiddleware from "../../middlewares/token.middleware";
const tokenMiddleware = TokenMiddleware.getInstance();
const controller = PaymentController.getInstance();
const role = ["user", "admin", "manager"];
const router = express.Router();

// Middleware access token & refresh token and authorization
const commonMiddlewares = [
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
];

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get payment of user
 *     tags: [Payment]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/PaymentResponse'
 *       404:
 *         description: Payment not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

// Get user paymentOption
router.get(
  "/",
  ...commonMiddlewares,
  asyncHandler(controller.getPaymentOption.bind(controller))
);

export default router;
