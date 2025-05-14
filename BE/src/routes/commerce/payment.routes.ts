import express from "express";
import PaymentController from "../../controllers/commerce/payment.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
const controller = PaymentController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get payment of user
 *     tags: [Payment]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/PaymentResponse'
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
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getPaymentOption.bind(controller))
);

export default router;
