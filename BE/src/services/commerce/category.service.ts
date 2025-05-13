import { CategoryDto } from "../../dto/commerce/category.dto";
import Category from "../../models/mongodb/commerce/category.model";
import { warpAsync } from "../../utils/warpAsync.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";

class CategoryService {
  private static instance: CategoryService;

  static getServiceInstance(): CategoryService {
    if (!CategoryService.instance)
      CategoryService.instance = new CategoryService();
    return CategoryService.instance;
  }
  private constructor() {}

  getAllCategory = warpAsync(async (): Promise<ServiceResponseType> => {
    const data = await Category.find({})
      .populate({
        path: "subcategories",
        populate: { path: "subcategories" },
      })
      .lean();
    return validateAndFormatData({
      data,
      userDto: CategoryDto,
      actionType: "getAll",
    });
  });

  getCategoryById = warpAsync(
    async (_id: string): Promise<ServiceResponseType> => {
      const data = await Category.findById({ _id })
        .populate({
          path: "subcategories",
          populate: { path: "subcategories" },
        })
        .lean();
      return validateAndFormatData({
        data,
        userDto: CategoryDto,
      });
    }
  );
}

export default CategoryService;
