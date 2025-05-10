import { z } from "zod";
import { ObjectId } from "mongodb";

export const profileDto = z
  .object({
    _id: z.union([z.string(), z.instanceof(ObjectId)]),
    prefixS3: z.string(),
    userId: z.string(),
    userName: z.string().default(""),
    description: z.string().default(""),
    allowedToShow: z.array(z.string()).default([]),
    accountType: z.string(),
    businessName: z.string(),
    numOfPostsInADay: z.number().default(0),
    followers: z.number().default(0),
    following: z.number().default(0),
    paymentOptions: z.array(z.string()).default([]),
    avgRating: z.number().default(0),
    itemsListing: z
      .array(
        z.object({ id: z.string().default(""), name: z.string().default("") })
      )
      .default([]),
    purchaseHistory: z
      .array(
        z.object({ id: z.string().default(""), name: z.string().default("") })
      )
      .default([]),
    profileLink: z.string().default(""),
    profileImage: z
      .union([
        z.string(),
        z.object({
          imageUrl: z.string().default(""),
          key: z.string().default(""),
        }),
      ])
      .default(""),
    coverImage: z
      .union([
        z.string(),
        z.object({
          imageUrl: z.string().default(""),
          key: z.string().default(""),
        }),
      ])
      .default(""),
  })
  .partial();

export const profileAddDto = profileDto.pick({
  accountType: true,
});

export const profileUpdateDto = profileDto
  .pick({
    userName: true,
    businessName: true,
    accountType: true,
    description: true,
    allowedToShow: true,
    paymentOptions: true,
    profileImage: true,
    coverImage: true,
  })
  .partial();

export type ProfileDtoType = z.infer<typeof profileDto>;
export type ProfileAddDtoType = z.infer<typeof profileAddDto>;
export type ProfileUpdateDtoType = z.infer<typeof profileUpdateDto>;
