import { Schema, model } from "mongoose";
import { UserSecurityDtoType } from "../../../dto/user/security.dto";

const userSecuritySchema = new Schema(
  {
    userId: { type: String, ref: "users", required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "business"],
      default: "user",
    },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    isEmailVerified: { type: Boolean, default: false },
    isAccountBlocked: { type: Boolean, default: false },
    isAccountDeleted: { type: Boolean, default: false },
    isTwoFactorAuth: { type: Boolean, default: false },
    twoFactorCode: { type: String, default: "" },
    numberLogin: { type: Number, default: 0 },
    lastFailedLoginTime: { type: Date, default: null },
    dateOfJoining: { type: Date, default: null },
    sign_up_provider: { type: String, default: "" },
    sign_in_provider: { type: String, default: "" },
    lastSeen: {
      type: String,
      default: "",
    },
    terms: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Security = model<UserSecurityDtoType>("Securities", userSecuritySchema);
export default Security;
