import { Request, Response } from "express";
import AddressService from "../../services/user/address.service";
import { controllerResponse } from "../../utils/responseHandler";

class AddressController {
  private static Instance: AddressController;
  private serviceInstance: AddressService;
  constructor() {
    this.serviceInstance = AddressService.getInstance();
  }

  public static getInstance(): AddressController {
    if (!AddressController.Instance) {
      AddressController.Instance = new AddressController();
    }
    return AddressController.Instance;
  }

  async addAddress(req: Request, res: Response): Promise<Response> {
    const retrievedAddress = await this.serviceInstance.addAddress(
      req.body,
      req.curUser.userId
    );
    return controllerResponse(res, retrievedAddress);
  }

  async getAddress(req: Request, res: Response): Promise<Response> {
    const retrievedAddress = await this.serviceInstance.getAddress(req.body.id);
    return controllerResponse(res, retrievedAddress);
  }

  async getAllAddress(req: Request, res: Response): Promise<Response> {
    const retrievedAddress = await this.serviceInstance.getAllAddress(
      req.curUser.userId
    );
    return controllerResponse(res, retrievedAddress);
  }

  async updateAddress(req: Request, res: Response): Promise<Response> {
    const retrievedAddress = await this.serviceInstance.updateAddress(
      req.body,
      req.body.id
    );
    return controllerResponse(res, retrievedAddress);
  }

  async countAddress(req: Request, res: Response): Promise<Response> {
    const count = await this.serviceInstance.countAddress();
    return controllerResponse(res, count);
  }

  async deleteAddress(req: Request, res: Response): Promise<Response> {
    const id = req.body.id;
    const retrievedAddress = await this.serviceInstance.deleteAddress(id);
    return controllerResponse(res, retrievedAddress);
  }
}

export default AddressController;
