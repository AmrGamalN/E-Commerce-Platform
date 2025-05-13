/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: amr5179520@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: Amr123456789@
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirm password
 *           example: Amr123456789@
 *         phoneNumber:
 *           type: string
 *           description: User's phone number, Accept any valid number
 *           example: "+201234567890"
 *         firstName:
 *           type: string
 *           description: User's first name
 *           example: Amr
 *         lastName:
 *           type: string
 *           description: User's last name
 *           example: Gamal
 *         gender:
 *           type: string
 *           description: Enter user gender
 *           example: male
 *         accountType:
 *           type: string
 *           description: Enter business or personal
 *           example: business
 *         terms:
 *           type: boolean
 *           description: User agreed to terms and conditions
 *           example: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    LoginEmailDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *           example: "amr5189520@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           description: "User's password"
 *           example: "Amr123456789@"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    LoginPhoneDto:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           description: "User's phone number"
 *           example: "+20120081238"
 *         password:
 *           type: string
 *           format: password
 *           description: "User's password"
 *           example: "Amr123456789@"
 */