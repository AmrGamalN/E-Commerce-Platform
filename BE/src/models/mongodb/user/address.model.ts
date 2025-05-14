import { model, Schema } from "mongoose";
import { AddressDtoType } from "../../../dto/user/address.dto";

const addressSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "users",
      default: "",
    },
    street: { type: String, required: true },
    suite: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    city: { type: String, required: true },
    governorate: { type: String, required: true },
    country: { type: String, required: true },
    type: { type: String, required: true },
    isDefault: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Address = model<AddressDtoType>("user_addresses", addressSchema);
export default Address;
