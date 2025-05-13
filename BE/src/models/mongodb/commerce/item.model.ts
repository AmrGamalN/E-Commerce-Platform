import { model, Schema } from "mongoose";
import { ItemDtoType } from "../../../dto/commerce/item.dto";
const CONDITION = [
  "New with tag",
  "New without tag",
  "Used with tag",
  "Used without tag",
  "Very Good",
  "Good",
];
const STATE = ["UNDER_REVIEW", "APPROVED", "PUBLISHED", "SOLD", "REJECT", ""];

const ItemCategorySchema = {
  prefixS3: { type: String },
  category: { type: String, required: true, trim: true },
  subcategory: { type: String, required: true, trim: true },
  brand: { type: String, optional: true, trim: true },
  type: { type: String, optional: true },
  path: [
    {
      id: { type: String, optional: true, default: "" },
      label: { type: String, optional: true, default: "" },
    },
  ],
};

const ItemDetailsSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  communications: {
    type: [String],
    default: "HD Chat",
  },
  condition: {
    type: String,
    optional: true,
    enum: CONDITION,
    default: "",
  },
  status: {
    type: String,
    required: true,
    enum: STATE,
    default: "UNDER_REVIEW",
  },
  itemImages: [
    {
      imageUrl: String,
      angles: Number,
      key: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
  size: { type: String, optional: true },
  color: {
    type: [String],
    optional: true,
    default: [],
  },
  material: { type: String, optional: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0, optional: true },
  isDiscount: { type: Boolean, default: false, optional: true },
  isSavedForLater: { type: Boolean, optional: true, default: false },
  allowNegotiate: { type: Boolean, default: false },
  isFirstItem: { type: Boolean, default: false },
  promotion: { type: Boolean, default: false },
  rate: {
    avgRating: {
      type: Number,
      default: 0,
    },
    rating: {
      type: [Number],
      default: [0, 0, 0, 0, 0], // ["bad", "average", "good", "very good", "excellent"]
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
};

const ItemOwnerSchema = {
  userId: {
    type: String,
    ref: "users",
    required: true,
  },
  userImage: { type: String, optional: true },
  userName: { type: String, optional: true },
  location: { type: String, required: true },
  paymentOptions: {
    type: [String],
    default: [],
  },
};

export const ItemSchema = new Schema(
  {
    ...ItemCategorySchema,
    ...ItemDetailsSchema,
    ...ItemOwnerSchema,
  },
  { timestamps: true }
);

const Item = model<ItemDtoType>("item_items", ItemSchema);
export default Item;
