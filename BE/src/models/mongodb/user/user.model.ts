import { Schema, model } from "mongoose";
import { UserDtoType } from "../../../dto/user/user.dto";

const UserSchema = new Schema(
  {
    userId: { type: String, ref: "users", required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: {
      type: String,
      default: null,
    },
    addressIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = model<UserDtoType>("user_users", UserSchema);
export default User;
