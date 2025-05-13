import express from "express";
import AddressController from "../../controllers/user/address.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  requiredParamMiddleware,
} from "../../middlewares/validator.middleware";
import {
  validateAddressAdd,
  validateAddressUpdate,
} from "../../validation/user/address.validator";
import { userAuthorizationMiddlewares } from "../../utils/authorizationRole.util";
const controller = AddressController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /address/count:
 *   get:
 *     summary: Get count of address
 *     tags: [Address]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.countAddress.bind(controller))
);

/**
 * @swagger
 * /address/add:
 *   post:
 *     summary: Get count of address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AddressPostDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Error to add address
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  ...userAuthorizationMiddlewares,
  expressValidator(validateAddressAdd),
  asyncHandler(controller.addAddress.bind(controller))
);

/**
 * @swagger
 * /address/update/{id}:
 *   put:
 *     summary: Get count of address
 *     tags: [Address]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AddressPostDTO'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  expressValidator(validateAddressUpdate),
  asyncHandler(controller.updateAddress.bind(controller))
);

/**
 * @swagger
 * /address/delete/{id}:
 *   delete:
 *     summary: address a by id
 *     tags: [Address]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.deleteAddress.bind(controller))
);

/**
 * @swagger
 * /address/get/{id}:
 *   get:
 *     summary: Get address by addressId
 *     tags: [Address]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id",
  ...userAuthorizationMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.getAddress.bind(controller))
);

/**
 * @swagger
 * /address:
 *   get:
 *     summary: Get all address
 *     tags: [Address]
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.getAllAddress.bind(controller))
);

export default router;
