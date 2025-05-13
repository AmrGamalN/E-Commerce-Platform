import { model, Schema } from "mongoose";
import { WishlistDtoType } from "../../../dto/commerce/wishlist.dto";

const wishListSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WishList = model<WishlistDtoType>("items_wishList", wishListSchema);
export default WishList;
