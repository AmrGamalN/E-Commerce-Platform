import { Schema, model } from "mongoose";
import { ProfileDtoType } from "../../../dto/user/profile.dto";

const ProfileSchema = new Schema(
  {
    prefixS3: { type: String },
    userId: {
      type: String,
      ref: "users",
      required: true,
      default: "",
    },
    userName: { type: String, default: "" },
    description: {
      type: String,
      default: "",
    },
    profileImage: {
      imageUrl: {
        type: String,
        default: "",
      },
      key: { type: String, default: "" },
    },
    coverImage: {
      imageUrl: {
        type: String,
        default: "",
      },
      key: { type: String, default: "" },
    },
    allowedToShow: {
      type: [String],
      default: [],
    },
    businessName: {
      type: String,
      default: "",
    },
    accountType: {
      type: String,
      default: "",
    },
    numOfPostsInADay: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    paymentOptions: {
      type: [String],
      default: [],
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    itemsListing: [
      {
        id: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
      },
    ],
    purchaseHistory: [
      {
        id: {
          type: String,
          default: "",
        },
        name: {
          type: String,
          default: "",
        },
      },
    ],
    profileLink: { type: String, default: "" },
  },
  { timestamps: true }
);

const Profile = model<ProfileDtoType>("Profile", ProfileSchema);
export default Profile;
