import { z } from "zod";
import { ObjectId } from "mongodb";

export const ReviewDto = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]),
  rate: z.number(),
  description: z.string(),
  buyerName: z.string(),
  title: z
    .enum(["bad", "average", "good", "veryGood", "excellent"])
    .default("good"),
  buyerId: z.string(),
  sellerId: z.string(),
  itemId: z.string(),
});

export const ReviewAddDto = ReviewDto.pick({
  itemId: true,
  rate: true,
  description: true,
  title: true,
});

export type ReviewDtoType = z.infer<typeof ReviewDto>;
export type ReviewDtoAddType = z.infer<typeof ReviewAddDto>;
