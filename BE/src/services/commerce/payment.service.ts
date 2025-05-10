import { UserPaymentDto } from "../../dto/commerce/payment.dto";
import { warpAsync } from "../../utils/warpAsync";
import { responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import Profile from "../../models/mongodb/user/profile.model";

class PaymentService {
  private static Instance: PaymentService;
  constructor() {}
  public static getInstance(): PaymentService {
    if (!PaymentService.Instance) {
      PaymentService.Instance = new PaymentService();
    }
    return PaymentService.Instance;
  }

  getPaymentOption = warpAsync(
    async (userId: string): Promise<responseHandler> => {
      const retrievedPayment = await Profile.findOne({
        userId: userId,
      })
        .select("paymentOptions")
        .lean();
      return validateAndFormatData(retrievedPayment?.paymentOptions, UserPaymentDto);
    }
  );
}

export default PaymentService;
