import { model, Schema } from "mongoose";
import { ItemDraftDtoType } from "../../../dto/commerce/draftItem.dto";
import { ItemSchema } from "./item.model";

const CONDITION = [
  "New with tag",
  "New without tag",
  "Used with tag",
  "Used without tag",
  "Very Good",
  "Good",
  "",
];
const STATE = ["UNDER_REVIEW", "APPROVED", "PUBLISHED", "SOLD", "REJECT"];

const ItemCategorySchema = {
  prefixS3: { type: String },
  category: { type: String, optional: true, trim: true, default: "" },
  subcategory: { type: String, optional: true, trim: true, default: "" },
  brand: { type: String, optional: true, trim: true, default: "" },
  type: { type: String, optional: true, default: "" },
  path: [
    {
      id: { type: String, optional: true, default: "" },
      label: { type: String, optional: true, default: "" },
    },
  ],
};

const ItemDetailsSchema = {
  title: { type: String, optional: true, default: "" },
  description: { type: String, optional: true, default: "" },
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
    optional: true,
    enum: STATE,
    default: "UNDER_REVIEW",
  },
  itemImages: [
    {
      imageUrl: String,
      angles: Number,
      key: {
        type: String,
        optional: true,
      },
      _id: false,
    },
  ],
  size: { type: String, optional: true, default: "" },
  color: [],
  material: { type: String, optional: true, default: "" },
  price: { type: Number, optional: true, default: "" },
  discount: { type: Number, optional: true, default: 0 },
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
    optional: true,
  },
  userImage: { type: String, optional: true },
  userName: { type: String, optional: true },
  location: { type: String, optional: true, default: "" },
  paymentOptions: {
    type: [String],
    default: [],
  },
};

export const ItemDraftSchema = new Schema(
  {
    ...ItemCategorySchema,
    ...ItemDetailsSchema,
    ...ItemOwnerSchema,
  },
  { timestamps: true }
);

const DraftItem = model<ItemDraftDtoType>("item_draftItems", ItemDraftSchema);
export default DraftItem;
