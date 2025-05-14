import { z } from "zod";
import { ObjectId } from "mongodb";

const ItemCategoryDto = z.object({
  prefixS3: z.string().default("").optional(),
  category: z.string(),
  subcategory: z.string(),
  userName: z.string(),
  brand: z.string().optional(),
  type: z.string().optional(),
  path: z.array(z.object({ id: z.string(), label: z.string() })).default([]),
});

const ItemDetailsDto = z.object({
  title: z.string(),
  description: z.string(),
  condition: z
    .enum([
      "New with tag",
      "New without tag",
      "Used with tag",
      "Used without tag",
      "Very Good",
      "Good",
      "",
    ])
    .default("")
    .optional(),
  status: z
    .enum(["UNDER_REVIEW", "PUBLISHED", "SOLD", "REJECT"])
    .default("UNDER_REVIEW"),
  itemImages: z
    .array(
      z.object({
        imageUrl: z.string(),
        angles: z.number(),
        key: z.string().optional(),
      })
    )
    .default([]),
  communications: z.array(z.string()).default([]),
  size: z.string().optional(),
  color: z.array(z.string()).default([]).optional(),
  material: z.string().optional(),
  price: z.number(),
  discount: z.number().default(0).optional(),
  isDiscount: z.boolean().default(false).optional(),
  isSavedForLater: z.boolean().default(false),
  allowNegotiate: z.boolean().default(false),
  isFirstItem: z.boolean().default(true),
  promotion: z.boolean().default(false),
  rate: z
    .object({
      avgRating: z.number(),
      rating: z.array(z.number()).default([0, 0, 0, 0, 0]),
      totalReviews: z.number(),
    })
    .optional(),
});

const ItemOwnerDto = z.object({
  userId: z.string(),
  userImage: z.string().optional(),
  userName: z.string().optional(),
  location: z.string(),
  paymentOptions: z.array(z.string()).default([]),
});

export const ItemDto = ItemCategoryDto.merge(ItemDetailsDto)
  .merge(ItemOwnerDto)
  .extend({
    _id: z.union([z.string(), z.instanceof(ObjectId)]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export const ItemAddDto = ItemDto.pick({
  prefixS3: true,
  category: true,
  subcategory: true,
  brand: true,
  type: true,
  itemImages: true,
  communications: true,
  title: true,
  description: true,
  condition: true,
  paymentOptions: true,
  location: true,
  size: true,
  color: true,
  material: true,
  price: true,
  discount: true,
  isDiscount: true,
  isSavedForLater: true,
  allowNegotiate: true,
});

export const ItemUpdateDto = ItemDto.pick({
  category: true,
  subcategory: true,
  brand: true,
  type: true,
  itemImages: true,
  communications: true,
  title: true,
  description: true,
  condition: true,
  paymentOptions: true,
  location: true,
  size: true,
  color: true,
  material: true,
  price: true,
  discount: true,
  isDiscount: true,
  isSavedForLater: true,
  allowNegotiate: true,
})
  .partial()
  .extend({
    keysImageUnchanged: z
      .array(
        z.object({
          key: z.string(),
          angle: z.number(),
        })
      )
      .default([])
      .optional(),
  });

export type ItemDtoType = z.infer<typeof ItemDto>;
export type ItemAddDtoType = z.infer<typeof ItemAddDto>;
export type ItemUpdateDtoType = z.infer<typeof ItemUpdateDto>;
