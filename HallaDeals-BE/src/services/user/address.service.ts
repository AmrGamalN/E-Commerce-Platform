import Address from "../../models/mongodb/user/address.model";
import {
  AddressDto,
  AddressAddDto,
  AddressUpdateDto,
  AddressAddDtoType,
  AddressUpdateDtoType,
} from "../../dto/user/address.dto";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";

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
    ): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, AddressAddDto);
      await Address.create({ ...parsed.data, userId: userId });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getAddress = warpAsync(async (query: object): Promise<responseHandler> => {
    const retrievedAddress = await Address.findOne(query);
    return validateAndFormatData(retrievedAddress, AddressDto);
  });

  getAllAddress = warpAsync(
    async (userId: string): Promise<responseHandler> => {
      const retrievedAddress = await Address.find({ userId });
      return validateAndFormatData(retrievedAddress, AddressDto, "getAll");
    }
  );

  updateAddress = warpAsync(
    async (
      data: AddressUpdateDtoType,
      query: object
    ): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, AddressUpdateDto, "update");
      if (!parsed.success) return parsed;

      const updatedAddress = await Address.findOneAndUpdate(
        query,
        {
          $set: parsed.data,
        },
        { new: true, runValidators: true }
      ).lean();

      return serviceResponse({
        data: updatedAddress,
      });
    }
  );

  countAddress = warpAsync(async (): Promise<responseHandler> => {
    return serviceResponse({
      count: await Address.countDocuments(),
    });
  });

  deleteAddress = warpAsync(async (query: object): Promise<responseHandler> => {
    return serviceResponse({
      deleteCount: (await Address.deleteOne(query)).deletedCount,
    });
  });
}

export default AddressService;
