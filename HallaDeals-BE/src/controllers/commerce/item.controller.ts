import { Request, Response } from "express";
import ItemService from "../../services/commerce/item.service";
import { controllerResponse } from "../../utils/responseHandler";
class ItemController {
  private static Instance: ItemController;
  private serviceInstance: ItemService;
  constructor() {
    this.serviceInstance = ItemService.getInstance();
  }

  public static getControllerInstance(): ItemController {
    if (!ItemController.Instance) {
      ItemController.Instance = new ItemController();
    }
    return ItemController.Instance;
  }

  async addItem(req: Request, res: Response): Promise<Response> {
    const retrievedItem = await this.serviceInstance.addItem(
      req.body,
      req.curUser
    );
    return controllerResponse(res, retrievedItem);
  }

  async getItem(req: Request, res: Response): Promise<Response> {
    const retrievedItem = await this.serviceInstance.getItem(req.body.id);
    return controllerResponse(res, retrievedItem);
  }

  async getAllItem(req: Request, res: Response): Promise<Response> {
    const retrievedItems = await this.serviceInstance.getAllItem(req.query);
    return controllerResponse(res, retrievedItems);
  }

  async getItemByCategoryId(req: Request, res: Response): Promise<Response> {
    const retrievedItems = await this.serviceInstance.getItemByCategoryId(
      req.params.id
    );
    return controllerResponse(res, retrievedItems);
  }

  async getItemBySubCategoryId(req: Request, res: Response): Promise<Response> {
    const retrievedItems = await this.serviceInstance.getItemBySubCategoryId(
      req.params.id
    );
    return controllerResponse(res, retrievedItems);
  }

  async updateItem(req: Request, res: Response): Promise<Response> {
    const updatedItem = await this.serviceInstance.updateItem(
      req.body,
      req.body.id
    );
    return controllerResponse(res, updatedItem);
  }

  async deleteImages(req: Request, res: Response): Promise<Response> {
    const deleteImage = await this.serviceInstance.deleteImages(
      req.body.deleteImageKeys,
      req.body.id
    );
    return controllerResponse(res, deleteImage);
  }

  async countItems(req: Request, res: Response): Promise<Response> {
    const count = await this.serviceInstance.countItems();
    return controllerResponse(res, count);
  }

  async deleteItem(req: Request, res: Response): Promise<Response> {
    const deletedItem = await this.serviceInstance.deleteItem(req.body.id);
    return controllerResponse(res, deletedItem);
  }

  async filterItem(req: Request, res: Response): Promise<Response> {
    const retrievedItems = await this.serviceInstance.filterItem(req.query);
    return controllerResponse(res, retrievedItems);
  }
}

export default ItemController;
