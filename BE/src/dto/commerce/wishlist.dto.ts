import { z } from "zod";
import { ObjectId } from "mongodb";

export const WishlistDto = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]),
  userId: z.string(),
  itemId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const WishlistAddDto = z.object({
  itemId: z.string(),
});
export type WishlistDtoType = z.infer<typeof WishlistDto>;
export type WishlistAddDtoType = z.infer<typeof WishlistAddDto>;
