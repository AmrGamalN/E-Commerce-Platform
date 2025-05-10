import { z } from "zod";
import { ObjectId } from "mongodb";

export const AddressDto = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]),
  street: z.string(),
  suite: z.string(),
  houseNumber: z.number(),
  city: z.string(),
  governorate: z.string(),
  country: z.string(),
  type: z.string(),
  isDefault: z.boolean().default(false),
});

export const AddressAddDto = AddressDto.pick({
  street: true,
  suite: true,
  houseNumber: true,
  city: true,
  governorate: true,
  country: true,
  type: true,
  isDefault: true,
});

export const AddressUpdateDto = AddressDto.pick({
  street: true,
  suite: true,
  houseNumber: true,
  city: true,
  governorate: true,
  country: true,
  type: true,
  isDefault: true,
}).partial();

export type AddressDtoType = z.infer<typeof AddressDto>;
export type AddressAddDtoType = z.infer<typeof AddressAddDto>;
export type AddressUpdateDtoType = z.infer<typeof AddressUpdateDto>;
