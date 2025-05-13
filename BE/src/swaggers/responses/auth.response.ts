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
 *
 *     LoginResponse:
 *       description: Login successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseResponse'
 *
 *     RegisterResponse:
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BaseResponse'
 */

