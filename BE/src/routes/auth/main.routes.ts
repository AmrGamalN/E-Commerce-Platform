import { Router } from "express";
import LoginController from "../../controllers/auth/login.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import LoginRoutes from "./login.routes";
import RegisterRoutes from "./register.routes";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
import RegisterController from "../../controllers/auth/register.controller";
const registerController = RegisterController.getInstance();
const loginController = LoginController.getInstance();
const router = Router();

router.use("/login", LoginRoutes);
router.use("/register", RegisterRoutes);
/**
 *   @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user and removes the refresh token from the cookies
 *     tags: [Auth]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/logout",
  ...userAuthorizationMiddlewares,
  asyncHandler(loginController.logOut.bind(loginController))
);

/**
 *   @swagger
 *   /auth/verify-email/{token}:
 *     get:
 *       summary: Verify email by click in url in user email
 *       tags: [Auth]
 *       parameters:
 *         - name: token
 *           in: path
 *           description: Enter token to verify email
 *           required: true
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/verify-email/:token",
  asyncHandler(registerController.verifyEmail.bind(registerController))
);

export default router;
