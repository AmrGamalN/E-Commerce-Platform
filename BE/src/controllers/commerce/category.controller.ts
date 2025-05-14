import CategoryService from "../../services/commerce/category.service";
import { Request, Response } from "express";
import { controllerResponse } from "../../utils/response.util";

class CategoryController {
  private serviceInstance: CategoryService;
  private static instance: CategoryController;

  private constructor() {
    this.serviceInstance = CategoryService.getServiceInstance();
  }

  static getControllerInstance(): CategoryController {
    if (!CategoryController.instance)
      CategoryController.instance = new CategoryController();
    return CategoryController.instance;
  }

  async getAllCategory(req: Request, res: Response): Promise<Response> {
    const category = await this.serviceInstance.getAllCategory();
    return controllerResponse(res, category);
  }

  async getCategoryById(req: Request, res: Response): Promise<Response> {
    const category = await this.serviceInstance.getCategoryById(req.params.id);
    return controllerResponse(res, category);
  }
}

export default CategoryController;
