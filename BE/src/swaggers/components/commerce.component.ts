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

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         rate:
 *           type: number
 *         description:
 *           type: string
 *         buyerName:
 *           type: string
 *         title:
 *           type: string
 *           enum: [bad, average, good, veryGood, excellent]
 *           default: good
 *         buyerId:
 *           type: string
 *         sellerId:
 *           type: string
 *         itemId:
 *           type: string
 *
 *     ReviewAddDto:
 *       type: object
 *       required:
 *         - itemId
 *         - rate
 *         - description
 *         - title
 *       properties:
 *         itemId:
 *           type: string
 *         rate:
 *           type: number
 *         description:
 *           type: string
 *         title:
 *           type: string
 *           enum: [bad, average, good, veryGood, excellent]
 *           default: good
 *
 *     ReviewUpdateDto:
 *       type: object
 *       properties:
 *         rate:
 *           type: number
 *         description:
 *           type: string
 *         title:
 *           type: string
 *           enum: [bad, average, good, veryGood, excellent]
 *           default: good
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         itemId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     WishlistAddDto:
 *       type: object
 *       required:
 *         - itemId
 *       properties:
 *         itemId:
 *           type: string
 */
