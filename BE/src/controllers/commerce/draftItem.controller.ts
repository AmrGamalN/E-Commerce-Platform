import { Request, Response } from "express";
import DraftItemService from "../../services/commerce/draftItem.service";
import { controllerResponse } from "../../utils/response.util";

class DraftItemController {
  private static Instance: DraftItemController;
  private serviceInstance: DraftItemService;
  constructor() {
    this.serviceInstance = DraftItemService.getInstance();
  }

  public static getInstance(): DraftItemController {
    if (!DraftItemController.Instance) {
      DraftItemController.Instance = new DraftItemController();
    }
    return DraftItemController.Instance;
  }

  async addDraftItem(req: Request, res: Response): Promise<Response> {
    const retrievedDraftItem = await this.serviceInstance.addDraftItem(
      req.body,
      req.curUser
    );
    return controllerResponse(res, retrievedDraftItem);
  }

  async getDraftItem(req: Request, res: Response): Promise<Response> {
    const retrievedDraftItem = await this.serviceInstance.getDraftItem(
      req.params.id
    );
    return controllerResponse(res, retrievedDraftItem);
  }

  async getAllDraftItem(req: Request, res: Response): Promise<Response> {
    const { price, createdAt, ...filters } = req.query;
    const sort = { price, createdAt };
    const retrievedDraftItem = await this.serviceInstance.getAllDraftItem(
      filters,
      sort,
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedDraftItem);
  }

  async updateDraftItem(req: Request, res: Response): Promise<Response> {
    const retrievedDraftItem = await this.serviceInstance.updateDraftItem(
      req.body,
      req.params.id
    );
    return controllerResponse(res, retrievedDraftItem);
  }

  async countDraftItems(req: Request, res: Response): Promise<Response> {
    const count = await this.serviceInstance.countDraftItems(
      req.curUser?.userId,
      req.query
    );
    return controllerResponse(res, count);
  }

  async deleteDraftItemImages(req: Request, res: Response): Promise<Response> {
    const deleteImage = await this.serviceInstance.deleteImages(
      req.body.deleteImageKeys,
      req.params.id
    );
    return controllerResponse(res, deleteImage);
  }

  async deleteDraftItem(req: Request, res: Response): Promise<Response> {
    const retrievedDraftItem = await this.serviceInstance.deleteDraftItem(
      req.params.id
    );
    return controllerResponse(res, retrievedDraftItem);
  }
}

export default DraftItemController;
