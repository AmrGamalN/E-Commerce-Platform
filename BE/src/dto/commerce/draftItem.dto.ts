import { z } from "zod";
import { ItemUpdateDto } from "./item.dto";
export const ItemDraftDto = ItemUpdateDto.omit({
  condition: true,
})
  .extend({
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
      .default(""),
  })
  .partial();
export type ItemDraftDtoType = z.infer<typeof ItemDraftDto>;
