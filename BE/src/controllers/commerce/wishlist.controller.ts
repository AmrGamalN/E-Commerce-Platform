import { Request, Response } from "express";
import WishlistService from "../../services/commerce/wishlist.service";
import { controllerResponse } from "../../utils/response.util";

class WishlistController {
  private static Instance: WishlistController;
  private serviceInstance: WishlistService;
  constructor() {
    this.serviceInstance = WishlistService.getInstance();
  }

  public static getInstance(): WishlistController {
    if (!WishlistController.Instance) {
      WishlistController.Instance = new WishlistController();
    }
    return WishlistController.Instance;
  }

  async addWishlist(req: Request, res: Response): Promise<Response> {
    const retrievedWishlist = await this.serviceInstance.addWishlist(
      req.body,
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedWishlist);
  }

  async getWishlist(req: Request, res: Response): Promise<Response> {
    const retrievedWishlist = await this.serviceInstance.getWishlist(
      req.params.id
    );
    return controllerResponse(res, retrievedWishlist);
  }

    async getAllWishlist(req: Request, res: Response): Promise<Response> {
    const retrievedWishlist = await this.serviceInstance.getAllWishlist(
      req.query,
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedWishlist);
  }

  async countWishlist(req: Request, res: Response): Promise<Response> {
    const count = await this.serviceInstance.countWishlist(req.curUser?.userId);
    return controllerResponse(res, count);
  }

  async deleteWishlist(req: Request, res: Response): Promise<Response> {
    const retrievedWishlist = await this.serviceInstance.deleteWishlist(
      req.params.id
    );
    return controllerResponse(res, retrievedWishlist);
  }

  async clearWishlist(req: Request, res: Response): Promise<Response> {
    const retrievedWishlist = await this.serviceInstance.clearWishlist(
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedWishlist);
  }
}

export default WishlistController;
