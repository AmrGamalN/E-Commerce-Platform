// Pagination
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
 *     AvgRatingParam:
 *       name: avgRating
 *       in: query
 *       description: Minimum average rating (0 - 5)
 *       required: false
 *       schema:
 *         type: number
 *     TitleRatingParam:
 *       name: title
 *       in: query
 *       description: Title-based rating filter
 *       required: false
 *       schema:
 *         type: string
 *         enum: [bad, average, good, very_good, excellent]
 *     CommunicationsParam:
 *       name: communications
 *       in: query
 *       description: Filter by available communication methods
 *       required: false
 *       schema:
 *         type: array
 *         items:
 *           type: string
 *           enum: [Phone, HD Chat, Both]
 *       style: form
 *       explode: true
 *     ColorParam:
 *       name: color
 *       in: query
 *       description: Filter by available colors
 *       required: false
 *       schema:
 *         type: array
 *         items:
 *           type: string
 *       style: form
 *       explode: true
 *     PriceMinParam:
 *       name: min
 *       in: query
 *       description: Minimum price
 *       required: false
 *       schema:
 *         type: number
 *     PriceMaxParam:
 *       name: max
 *       in: query
 *       description: Maximum price
 *       required: false
 *       schema:
 *         type: number
 *     CreatedFromParam:
 *       name: from
 *       in: query
 *       description: Filter by creation date (from)
 *       required: false
 *       schema:
 *         type: string
 *         format: date
 *     CreatedToParam:
 *       name: to
 *       in: query
 *       description: Filter by creation date (to)
 *       required: false
 *       schema:
 *         type: string
 *         format: date
 *     DiscountParam:
 *       name: discount
 *       in: query
 *       description: Filter by discounted items
 *       required: false
 *       schema:
 *         type: boolean
 *     AllowNegotiateParam:
 *       name: allowNegotiate
 *       in: query
 *       description: Filter by items that allow price negotiation
 *       required: false
 *       schema:
 *         type: boolean
 *     CategoryParam:
 *       name: category
 *       in: query
 *       description: Filter by category
 *       required: false
 *       schema:
 *         type: string
 *     SubItemParam:
 *       name: subcategory
 *       in: query
 *       description: Filter by subcategory
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
 *     ConditionParam:
 *       name: condition
 *       in: query
 *       description: Filter by item condition
 *       required: false
 *       schema:
 *         type: string
 *         enum:
 *           - New with tag
 *           - New without tag
 *           - Used with tag
 *           - Used without tag
 *           - Very Good
 *           - Good
 *     LocationParam:
 *       name: location
 *       in: query
 *       description: Filter by location
 *       required: false
 *       schema:
 *         type: string
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
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     ItemSortPrice:
 *       in: query
 *       name: sortPrice
 *       schema:
 *         type: integer
 *         enum: [1, -1]
 *       required: false
 *       description: Sort items by price (1 = ASC, -1 = DESC)
 *
 *     ItemSortCreatedAt:
 *       in: query
 *       name: createdAt
 *       schema:
 *         type: integer
 *         enum: [1, -1]
 *       required: false
 *       description: Sort items by creation date (1 = ASC, -1 = DESC)
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     TitleParam:
 *       in: query
 *       name: title
 *       schema:
 *         type: string
 *         enum: [bad, average, good, veryGood, excellent]
 *       required: false
 *       description: Filter by rating title
 *
 *     RateParam:
 *       in: query
 *       name: rate
 *       schema:
 *         type: number
 *       required: false
 *       description: Filter by numeric rating value
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     ReviewSortCreatedAt:
 *       in: query
 *       name: createdAt
 *       schema:
 *         type: integer
 *         enum: [1, -1]
 *       required: false
 *       description: Sort reviews by creation date (1 = ASC, -1 = DESC)
 */
