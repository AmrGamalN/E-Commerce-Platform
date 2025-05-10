import User from "../../models/mongodb/user/user.model";
import {
  UserDto,
  UserUpdateDto,
  UserUpdateDtoType,
} from "../../dto/user/user.dto";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import AddressService from "./address.service";
import { Pagination } from "../../utils/pagination";

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
    async (
      UserData: UserUpdateDtoType,
      query: object
    ): Promise<responseHandler> => {
      const parseSafe = validateAndFormatData(UserData, UserUpdateDto,"update");
      if (!parseSafe.success) return parseSafe;

      const updateUser = await User.findOneAndUpdate(
        query,
        {
          $set: {
            ...UserData,
          },
        },
        {
          new: true,
        }
      ).lean();

      return serviceResponse({
        data: updateUser,
      });
    }
  );

  getUser = warpAsync(async (query: object): Promise<responseHandler> => {
    const getUser = await User.findOne(query).lean();
    return validateAndFormatData(getUser, UserDto);
  });

  getAllUsers = warpAsync(
    async (args: { page: number; limit: number }): Promise<responseHandler> => {
      const count = await this.countUser();
      return Pagination(User, UserDto, count.count ?? 0, args);
    }
  );

  countUser = warpAsync(async (): Promise<responseHandler> => {
    return serviceResponse({
      count: await User.countDocuments(),
    });
  });

  getMe = warpAsync(async (curUser): Promise<responseHandler> => {
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
      this.getUser({userId}),
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
