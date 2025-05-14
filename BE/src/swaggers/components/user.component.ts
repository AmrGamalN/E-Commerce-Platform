/**
 * @swagger
 * components:
 *   schemas:
 *     AddressGetDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         street:
 *           type: string
 *         suite:
 *           type: string
 *         houseNumber:
 *           type: number
 *         city:
 *           type: string
 *         governorate:
 *           type: string
 *         country:
 *           type: string
 *         type:
 *           type: string
 *         isDefault:
 *           type: boolean
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddressPostDTO:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         suite:
 *           type: string
 *         houseNumber:
 *           type: number
 *         city:
 *           type: string
 *         governorate:
 *           type: string
 *         country:
 *           type: string
 *         type:
 *           type: string
 *         isDefault:
 *           type: boolean
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileGetDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         businessName:
 *           type: string
 *         prefixS3:
 *           type: string
 *         description:
 *           type: string
 *         accountType:
 *           type: string
 *         numOfPostsInADay:
 *           type: number
 *         followers:
 *           type: number
 *         following:
 *           type: number
 *         paymentOptions:
 *           type: array
 *           items:
 *             type: string
 *         avgRating:
 *           type: number
 *         itemsListing:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         purchaseHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *         profileLink:
 *           type: string
 *         profileImage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *               angles:
 *                 type: number
 *               key:
 *                 type: string
 *         coverImage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *               angles:
 *                 type: number
 *               key:
 *                 type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileUpdateDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *           description: "User's name is unique"
 *           example: "AmrGamal123456"
 *         businessName:
 *           type: string
 *           description: "User's business name"
 *           example: "GamalStore"
 *         description:
 *           type: string
 *           description: "User's description"
 *           example: "We sell quality products at great prices."
 *         accountType:
 *           type: string
 *           description: "Account type (business or personal)"
 *           example: "business"
 *         paymentOptions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Cash", "Visa", "Fawry"]
 *         allowedToShow:
 *           type: array
 *           items:
 *             type: string
 *           default: []
 *           example: ["followers", "location"]
 *         profileImage:
 *           type: string
 *           format: binary
 *           description: Profile image to be updated (jpeg, png, jpg).
 *           example: "profile.jpg"
 *         coverImage:
 *           type: string
 *           format: binary
 *           description: Cover image to be updated (jpeg, png, jpg).
 *           example: "cover.png"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SecurityBaseDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *           description: "User's email address"
 *           example: "user@example.com"
 *         phoneNumber:
 *           type: string
 *           description: "User's phoneNumber number (optional)"
 *           example: "+1234567890"
 *         password:
 *           type: string
 *           description: "User's password"
 *           example: "StrongP@ssw0rd"
 *         role:
 *           type: string
 *           enum: ["admin", "user", "business"]
 *           default: "user"
 *         status:
 *           type: string
 *           enum: ["active", "inactive"]
 *           default: "inactive"
 *         isEmailVerified:
 *           type: boolean
 *           default: false
 *         isAccountBlocked:
 *           type: boolean
 *           default: false
 *         isAccountDeleted:
 *           type: boolean
 *           default: false
 *         isTwoFactorAuth:
 *           type: boolean
 *           default: false
 *         terms:
 *           type: boolean
 *           default: false
 *         twoFactorCode:
 *           type: string
 *         numberLogin:
 *           type: number
 *           default: 0
 *         lastFailedLoginTime:
 *           type: string
 *         dateOfJoining:
 *           type: string
 *         lastSeen:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SecurityGetDTO:
 *      allOf:
 *        - $ref: '#/components/schemas/SecurityBaseDTO'
 *        - type: object
 *          properties:
 *            _id:
 *               type: string
 *            userId:
 *               type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SecurityUpdateDTO:
 *      allOf:
 *        - $ref: '#/components/schemas/SecurityBaseDTO'
 *        - type: object
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserGetDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *         addressIds:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "6472e35d9a542bd8f0a763b5"
 *           description: The ID of the user to act on
 *         firstName:
 *           type: string
 *           description: "User's first name"
 *           example: "Amr"
 *         lastName:
 *           type: string
 *           description: "User's last name"
 *           example: "Gamal"
 *         gender:
 *           type: string
 *           description: "Enter gender"
 *           example: "male"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserActionDto:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "6472e35d9a542bd8f0a763b5"
 *           description: The ID of the user to act on
 *         block:
 *           type: boolean
 *           default: false
 *           description: Set to true to block the user account (optional)
 *         delete:
 *           type: boolean
 *           default: false
 *           description: Set to true to delete the user account (optional)
 */
