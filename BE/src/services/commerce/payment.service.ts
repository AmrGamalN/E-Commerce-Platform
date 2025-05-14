import { UserPaymentDto } from "../../dto/commerce/payment.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import Profile from "../../models/mongodb/user/profile.model";
import { serviceResponse } from "../../utils/response.util";

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
    async (userId: string): Promise<ServiceResponseType> => {
      const data = await Profile.findOne({
        userId: userId,
      })
        .select("paymentOptions")
        .lean();
      const validatedData = validateAndFormatData({
        data,
        userDto: UserPaymentDto,
      });

      return serviceResponse({
        statusText: "OK",
        data: validatedData.data.paymentOptions,
      });
    }
  );
}

export default PaymentService;
