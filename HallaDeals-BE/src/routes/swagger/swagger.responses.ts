/**
 * @swagger
 * components:
 *   schemas:
 *     BaseResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         pagination:
 *           type: object
 *         count:
 *           type: number
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 */

//#region Item components [Item - DraftItem - Category - Payment]
/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     ItemResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/ItemGetDTO'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     CategoryResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/CategoryDTO'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     PaymentResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/PaymentDTO'
 */

//#endregion

//#region User components [User - Profile - Security - Address]

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     AddressResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/AddressGetDTO'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     ProfileResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/ProfileGetDTO'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     UserResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/UserGetDTO'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     SecurityResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/SecurityGetDTO'
 */

//#endregion

//#region Authentication components [Login - Register]

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     LoginResponse:
 *       description: Login successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseResponse'
 */

/**
 * @swagger
 * components:
 *   responses:
 *     description: Successfully
 *     RegisterResponse:
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseResponse'
 */
//#endregion
