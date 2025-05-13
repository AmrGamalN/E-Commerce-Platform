import { model, Schema } from "mongoose";
import { CategoryDtoType } from "../../../dto/commerce/category.dto";

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  _id: { type: String, required: true },
  types: [
    {
      name: { type: String, required: true },
      _id: { type: String, required: true },
    },
  ],
  brands: [
    {
      name: { type: String, required: true },
      _id: { type: String, required: true },
    },
  ],
  subcategories: [this],
});

const categorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: [subcategorySchema],
});

const Category = model<CategoryDtoType>("item_categories", categorySchema);
export default Category;
