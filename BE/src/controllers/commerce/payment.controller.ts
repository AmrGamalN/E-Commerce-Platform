import { Request, Response } from "express";
import PaymentService from "../../services/commerce/payment.service";
import { controllerResponse } from "../../utils/response.util";

class PaymentController {
  private static Instance: PaymentController;
  private serviceInstance: PaymentService;
  constructor() {
    this.serviceInstance = PaymentService.getInstance();
  }

  public static getInstance(): PaymentController {
    if (!PaymentController.Instance) {
      PaymentController.Instance = new PaymentController();
    }
    return PaymentController.Instance;
  }

  async getPaymentOption(req: Request, res: Response): Promise<Response> {
    const retrievedPayment = await this.serviceInstance.getPaymentOption(
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedPayment);
  }
}
export default PaymentController;
