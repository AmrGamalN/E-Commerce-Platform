import { model, Schema } from "mongoose";
import { ReviewDtoType } from "../../../dto/commerce/review.dto";
const title = ["bad", "average", "good", "veryGood", "excellent"];

const reviewSchema: Schema = new Schema(
  {
    rate: { type: Number, required: true },
    description: { type: String, required: true },
    title: { type: String, enum: title, required: true, default: "good" },
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerName: { type: String, required: true },
    itemId: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = model<ReviewDtoType>("item_reviews", reviewSchema);
export default Review;
