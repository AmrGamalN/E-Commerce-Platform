import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserDto = z
  .object({
    _id: z.union([z.string(), z.instanceof(ObjectId)]),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.union([z.string(), z.null()]),
    addressIds: z.array(z.string()).default([]),
  })
  .partial();

export const UserAddDto = UserDto.pick({
  firstName: true,
  lastName: true,
  gender: true,
});

export const UserUpdateDto = UserDto.pick({
  firstName: true,
  lastName: true,
  gender: true,
}).partial();

export type UserDtoType = z.infer<typeof UserDto>;
export type UserAddDtoType = z.infer<typeof UserAddDto>;
export type UserUpdateDtoType = z.infer<typeof UserUpdateDto>;
