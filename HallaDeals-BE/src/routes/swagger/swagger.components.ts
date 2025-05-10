/**
 * @swagger
 * components:
 *   parameters:
 *     Id:
 *      name: id
 *      in: path
 *      required: false
 *      description: Enter id
 *      schema:
 *        type: string
 */
/**
 * @swagger
 * components:
 *   parameters:
 *     userIdComponents:
 *      name: userId
 *      in: path
 *      required: false
 *      description: Enter userId
 *      schema:
 *        type: string
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     PageParam:
 *       name: page
 *       in: query
 *       description: Enter page number
 *       required: false
 *       schema:
 *         type: integer
 *         default: 1
 *     LimitParam:
 *       name: limit
 *       in: query
 *       description: Enter limit number
 *       required: false
 *       schema:
 *         type: integer
 *         default: 10
 */

//#region Item components [ Item - DraftItem - Category - Payment , itemFilter]
/**
 * @swagger
 * components:
 *   schemas:
 *     ItemBaseDTO:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           example: "Electronics"
 *         subcategory:
 *           type: string
 *           example: "Mobile Phones"
 *         brand:
 *           type: string
 *           required: false
 *           example: "Samsung"
 *         communications:
 *           type: array
 *           items:
 *             type: string
 *           example: ["chat", "call"]
 *         title:
 *           type: string
 *           example: "Samsung Galaxy S22 Ultra"
 *         description:
 *           type: string
 *           example: "Brand new Samsung phone with 256GB storage and 12GB RAM"
 *         condition:
 *           type: string
 *           required: false
 *           enum:
 *             - New with tag
 *             - New without tag
 *             - Used with tag
 *             - Used without tag
 *             - Very Good
 *             - Good
 *             - ""
 *           example: ""
 *         paymentOptions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["cash", "installment"]
 *         location:
 *           type: string
 *           example: "6806bf99c9f0fe018487bf59"
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "+201234567890"
 *         type:
 *           type: string
 *           nullable: true
 *           example: "For Sale"
 *         size:
 *           type: string
 *           nullable: true
 *           example: "Medium"
 *         color:
 *           type: array
 *           items:
 *             type: string
 *           example: ["black", "blue"]
 *         price:
 *           type: number
 *           example: 15000
 *         discount:
 *           type: number
 *           default: 0
 *           example: 500
 *         isDiscount:
 *           type: boolean
 *           default: false
 *           example: true
 *         isSavedForLater:
 *           type: boolean
 *           default: false
 *           example: false
 *         allowNegotiate:
 *           type: boolean
 *           default: false
 *           example: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemGetDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/ItemBaseDTO'
 *         - type: object
 *           properties:
 *             userId:
 *               type: string
 *             itemImages:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   isFirstItem:
 *                     type: boolean
 *                     default: false
 *                     example: false
 *                   itemImages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                        imageUrl:
 *                          type: string
 *                        angles:
 *                          type: number
 *                        key:
 *                         type: string
 *                   promotion:
 *                     type: boolean
 *                     default: false
 *                     example: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemPostDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/ItemBaseDTO'
 *         - type: object
 *           properties:
 *             itemImages:
 *               type: array
 *               items:
 *                 type: string
 *                 format: binary
 *               description: Images to be updated (jpeg, png, jpg).
 *             angles:
 *               type: array
 *               items:
 *                 type: number
 *               description: Rotation degree for each updated image.
 *               example: [90, 180]
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     PageParam:
 *       name: page
 *       in: query
 *       description: Enter page number
 *       required: false
 *       schema:
 *         type: integer
 *         default: 1
 *     LimitParam:
 *       name: limit
 *       in: query
 *       description: Enter limit number
 *       required: false
 *       schema:
 *         type: integer
 *         default: 10
 *     ItemParam:
 *       name: category
 *       in: query
 *       description: Filter by Item
 *       required: false
 *       schema:
 *         type: string
 *     SubItemParam:
 *       name: subCategory
 *       in: query
 *       description: Filter by subItem
 *       required: false
 *       schema:
 *         type: string
 *     BrandParam:
 *       name: brand
 *       in: query
 *       description: Filter by brand
 *       required: false
 *       schema:
 *         type: string
 *     TypeParam:
 *       name: type
 *       in: query
 *       description: Filter by type
 *       required: false
 *       schema:
 *         type: string
 *     DiscountParam:
 *       name: discount
 *       in: query
 *       description: Filter by discount
 *       required: false
 *       schema:
 *         type: boolean
 *     SizeParam:
 *       name: size
 *       in: query
 *       description: Filter by size
 *       required: false
 *       schema:
 *         type: string
 *     MaterialParam:
 *       name: material
 *       in: query
 *       description: Filter by material
 *       required: false
 *       schema:
 *         type: string
 *     ColorParam:
 *       name: color
 *       in: query
 *       description: Filter by color
 *       required: false
 *       schema:
 *         type: array
 *         items:
 *           type: string
 *         example: [red, blue]
 *     LocationParam:
 *       name: location
 *       in: query
 *       description: Filter by location
 *       required: false
 *       schema:
 *         type: string
 *     ConditionParam:
 *       name: condition
 *       in: query
 *       description: Filter by condition
 *       required: false
 *       schema:
 *         type: string
 *     AllowNegotiateParam:
 *       name: allowNegotiate
 *       in: query
 *       description: Filter by negotiate
 *       required: false
 *       schema:
 *         type: boolean
 *     PriceMinParam:
 *       name: priceMin
 *       in: query
 *       description: Minimum price
 *       required: false
 *       schema:
 *         type: number
 *         format: float
 *     PriceMaxParam:
 *       name: priceMax
 *       in: query
 *       description: Maximum price
 *       required: false
 *       schema:
 *         type: number
 *         format: float
 *     CreatedFromParam:
 *       name: createdFrom
 *       in: query
 *       description: Creation date from
 *       required: false
 *       schema:
 *         type: string
 *         format: date-time
 *     CreatedToParam:
 *       name: createdTo
 *       in: query
 *       description: Creation date to
 *       required: false
 *       schema:
 *         type: string
 *         format: date-time
 *     CommunicationsParam:
 *       name: communications
 *       in: query
 *       description: Filter by communication methods
 *       required: false
 *       schema:
 *         type: array
 *         items:
 *           type: string
 *         example: [phone, chat]
 *     AvgRatingParam:
 *       name: avgRating
 *       in: query
 *       description: Filter by average rating
 *       required: false
 *       schema:
 *         type: number
 *         format: float
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         _id:
 *           type: string
 *     Subcategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         _id:
 *           type: string
 *         types:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               _id:
 *                 type: string
 *         brands:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               _id:
 *                 type: string
 *         subcategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subcategory'
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         _id:
 *           type: string
 *         subcategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subcategory'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentDTO:
 *       type: object
 *       properties:
 *         paymentOptions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Cash", "Visa", "Fawry"]
 */
//#endregion

//#region User components [ User - Profile - Security - Address ]
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

//#endregion

//#region Authentication components [ Login - Register ]

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

//#endregion
