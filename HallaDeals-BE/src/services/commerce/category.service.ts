import { CategoryDto } from "../../dto/commerce/category.dto";
import Category from "../../models/mongodb/commerce/category.model";
import { warpAsync } from "../../utils/warpAsync";
import { responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";

class CategoryService {
  private static instance: CategoryService;

  static getServiceInstance(): CategoryService {
    if (!CategoryService.instance)
      CategoryService.instance = new CategoryService();
    return CategoryService.instance;
  }
  private constructor() {}

  getAllCategory = warpAsync(async (): Promise<responseHandler> => {
    const retrievedCategory = await Category.find({})
      .populate({
        path: "subcategories",
        populate: { path: "subcategories" },
      })
      .lean();
    return validateAndFormatData(retrievedCategory, CategoryDto, "getAll");
  });

  getCategoryById = warpAsync(async (id: string): Promise<responseHandler> => {
    const retrievedCategory = await Category.findOne({ _id: id })
      .populate({
        path: "subcategories",
        populate: { path: "subcategories" },
      })
      .lean();
    return validateAndFormatData(retrievedCategory, CategoryDto);
  });
}

export default CategoryService;
