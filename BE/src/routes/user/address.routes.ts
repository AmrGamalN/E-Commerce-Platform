import express from "express";
import AddressController from "../../controllers/user/address.controller";
import { asyncHandler } from "../../middlewares/handleError";
import {
  expressValidator,
  validateParamMiddleware,
} from "../../middlewares/validatorMiddleware";
import TokenMiddleware from "../../middlewares/token.middleware";
import {
  validateAddressAdd,
  validateAddressUpdate,
} from "../../validation/user/address.validator";
const role = ["user", "admin", "manager"];
const controller = AddressController.getInstance();
const tokenMiddleware = TokenMiddleware.getInstance();
const router = express.Router();

const commonMiddlewares = [
  asyncHandler(tokenMiddleware.refreshTokenMiddleware),
  asyncHandler(tokenMiddleware.authorizationMiddleware(role)),
];

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
  ...commonMiddlewares,
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
  ...commonMiddlewares,
  asyncHandler(expressValidator(validateAddressAdd)),
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
 *         $ref: '#/components/responses/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
  asyncHandler(expressValidator(validateAddressUpdate)),
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
  "/delete/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
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
 *         $ref: '#/components/responses/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id?",
  ...commonMiddlewares,
  asyncHandler(validateParamMiddleware()),
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
 *         $ref: '#/components/responses/AddressResponse'
 *       404:
 *         description: Address not found
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  ...commonMiddlewares,
  asyncHandler(controller.getAllAddress.bind(controller))
);

export default router;
