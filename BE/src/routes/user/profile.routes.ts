import express from "express";
import ProfileController from "../../controllers/user/profile.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  requiredUserIdMiddleware,
} from "../../middlewares/validator.middleware";
import { validateProfileUpdate } from "../../validation/user/profile.validator";
import MiddlewareUploadFile from "../../middlewares/uploadFile.middleware";
import { userImageParser } from "../../middlewares/parser.middleware";
import {
  adminAuthorizationMiddlewares,
  userAuthorizationMiddlewares,
} from "../../utils/authorizationRole.util";
const controller = ProfileController.getInstance();
const middlewareUploadFile = MiddlewareUploadFile.getInstance();
const router = express.Router();

/**
 * @swagger
 * /user/profile/update:
 *   put:
 *     summary: Update user profile
 *     description: Update user profile details including business, personal, and payment options
 *     tags: [Profile]
 *     parameters:
 *       - name: prefix
 *         in: query
 *         required: false
 *         description: A unique prefix used to group uploaded images
 *         example: e388da91-4ae8-4e02-8921-7e5d3ff50a6f
 *         schema:
 *           type: string
 *       - name: keys-images-unchanged
 *         in: header
 *         required: false
 *         description: Image keys unchanged.
 *         example: '[{"key":"58b287c5-a2b8-47e2-9194-1824dae42418/1744494527991-58b287c5-a2b8-47e2-9194-1824dae42418-fb_img_1658325664102.jpg","angle":99999}]'
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdateDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ProfileResponse'
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update",
  ...userAuthorizationMiddlewares,
  middlewareUploadFile.detectS3Folder,
  middlewareUploadFile.countImagesBeforeUpload,
  middlewareUploadFile.markUnchangedImages,
  middlewareUploadFile.uploadUserImage,
  asyncHandler(userImageParser),
  asyncHandler(expressValidator(validateProfileUpdate)),
  asyncHandler(controller.updateProfile.bind(controller))
);

/**
 * @swagger
 * /user/profile/get-all:
 *   get:
 *     summary: Get all user profile
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [Profile]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ProfileResponse'
 *       404:
 *         description: Profile not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all",
  ...adminAuthorizationMiddlewares,
  asyncHandler(controller.getAllProfiles.bind(controller))
);

/**
 * @swagger
 * /user/profile/get/{userId}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile details of the authenticated user
 *     tags: [Profile]
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ProfileResponse'
 *       404:
 *         description: Profile not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:userId",
  ...userAuthorizationMiddlewares,
  requiredUserIdMiddleware(),
  asyncHandler(controller.getProfile.bind(controller))
);

/**
 * @swagger
 * /user/profile/{id}:
 *   get:
 *     summary: Get user profile by link when click on link get user profile but you should login before get user
 *     description: Retrieve the profile details
 *     tags: [Profile]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/ProfileResponse'
 *       404:
 *         description: Profile not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getProfileByLink.bind(controller))
);
export default router;
