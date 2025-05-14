import User from "../../models/mongodb/user/user.model";
import {
  UserDto,
  UserUpdateDto,
  UserUpdateDtoType,
} from "../../dto/user/user.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import AddressService from "./address.service";
import { generatePagination } from "../../utils/generatePagination.util";

class UserService {
  private static instanceService: UserService;
  private addressService: AddressService;

  public static getInstance(): UserService {
    if (!UserService.instanceService) {
      UserService.instanceService = new UserService();
    }
    return UserService.instanceService;
  }

  constructor() {
    this.addressService = AddressService.getInstance();
  }

  updateUser = warpAsync(
    async (data: UserUpdateDtoType): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: UserUpdateDto,
        actionType: "update",
      });
      if (!validationResult.success) return validationResult;

      const updateUser = await User.updateOne(
        { userId: data.userId },
        {
          $set: {
            ...data,
          },
        }
      );
      return serviceResponse({
        updatedCount: updateUser.modifiedCount,
      });
    }
  );

  getUser = warpAsync(async (userId: string): Promise<ServiceResponseType> => {
    return validateAndFormatData({
      data: await User.findOne({ userId }).lean(),
      userDto: UserDto,
    });
  });

  getAllUsers = warpAsync(
    async (queries: {
      page: number;
      limit: number;
    }): Promise<ServiceResponseType> => {
      const count = await this.countUser();
      return await generatePagination({
        model: User,
        userDto: UserDto,
        totalCount: count.count,
        paginationOptions: {
          page: queries.page,
          limit: queries.limit,
        },
      });
    }
  );

  countUser = warpAsync(async (): Promise<ServiceResponseType> => {
    return serviceResponse({
      count: await User.countDocuments(),
    });
  });

  getMe = warpAsync(async (curUser): Promise<ServiceResponseType> => {
    const {
      userId,
      name,
      role,
      email,
      dateOfJoining,
      lastSeen,
      userName,
      profileImage,
      coverImage,
    } = curUser;

    const [user, userAddress] = await Promise.all([
      this.getUser({ userId }),
      this.addressService.getAllAddress(userId),
    ]);

    const userInformation = {
      userId,
      name,
      role,
      email,
      dateOfJoining,
      lastSeen,
      userName,
      profileImage,
      coverImage,
      firstName: user?.data?.firstName,
      lastName: user?.data?.lastName,
      gender: user?.data?.gender,
      userAddress: userAddress,
    };
    return serviceResponse({
      statusText: "OK",
      data: userInformation,
    });
  });
}

export default UserService;
