import Address from "../../models/mongodb/user/address.model";
import {
  AddressDto,
  AddressAddDto,
  AddressUpdateDto,
  AddressAddDtoType,
  AddressUpdateDtoType,
} from "../../dto/user/address.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";

class AddressService {
  private static Instance: AddressService;
  constructor() {}
  public static getInstance(): AddressService {
    if (!AddressService.Instance) {
      AddressService.Instance = new AddressService();
    }
    return AddressService.Instance;
  }

  addAddress = warpAsync(
    async (
      data: AddressAddDtoType,
      userId: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: AddressAddDto,
      });
      await Address.create({ ...validationResult.data, userId: userId });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getAddress = warpAsync(async (_id: object): Promise<ServiceResponseType> => {
    return validateAndFormatData({
      data: await Address.findById({ _id }),
      userDto: AddressDto,
    });
  });

  getAllAddress = warpAsync(
    async (userId: string): Promise<ServiceResponseType> => {
      return validateAndFormatData({
        data: await Address.find({ userId }),
        userDto: AddressDto,
        actionType: "getAll",
      });
    }
  );

  updateAddress = warpAsync(
    async (
      data: AddressUpdateDtoType,
      _id: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: AddressUpdateDto,
        actionType: "update",
      });
      if (!validationResult.success) return validationResult;

      const updatedAddress = await Address.updateOne(
        { _id },
        {
          $set: validationResult.data,
        }
      );
      return serviceResponse({
        updatedCount: updatedAddress.modifiedCount,
      });
    }
  );

  countAddress = warpAsync(async (): Promise<ServiceResponseType> => {
    return serviceResponse({
      count: await Address.countDocuments(),
    });
  });

  deleteAddress = warpAsync(
    async (_id: object): Promise<ServiceResponseType> => {
      return serviceResponse({
        deletedCount: (await Address.deleteOne({ _id })).deletedCount,
      });
    }
  );
}

export default AddressService;
