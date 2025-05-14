import Profile from "../../models/mongodb/user/profile.model";
import {
  profileDto,
  profileUpdateDto,
  ProfileUpdateDtoType,
} from "../../dto/user/profile.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import { generatePagination } from "../../utils/generatePagination.util";

class ProfileService {
  private static instanceService: ProfileService;
  public static getInstance(): ProfileService {
    if (!ProfileService.instanceService) {
      ProfileService.instanceService = new ProfileService();
    }
    return ProfileService.instanceService;
  }

  updateProfile = warpAsync(
    async (data: ProfileUpdateDtoType): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: profileUpdateDto,
        actionType: "update",
      });
      if (!validationResult.success) return validationResult;

      const isUserName = await Profile.exists({
        userName: data.userName,
      });

      if (isUserName)
        return serviceResponse({
          statusText: "Conflict",
          message: "User name already exists",
        });

      const updateProfile = await Profile.updateOne(
         { userId: data.userId },
        {
          $set: {
            ...validationResult.data,
            profileLink: `${process.env.BACKEND_URL}/user/profile/${data.userName}`,
          },
        }
      );
      return serviceResponse({
        updatedCount: updateProfile?.modifiedCount,
      });
    }
  );

  getProfileByLink = warpAsync(
    async (link: string): Promise<ServiceResponseType> => {
      const data = await Profile.findOne({
        profileLink: process.env.BACKEND_URL + link,
      }).lean();
      return validateAndFormatData({
        data,
        userDto: profileDto,
      });
    }
  );

  getProfile = warpAsync(
    async (userId: string): Promise<ServiceResponseType> => {
      return validateAndFormatData({
        data: await Profile.findOne({ userId }).lean(),
        userDto: profileDto,
      });
    }
  );

  getAllProfiles = warpAsync(
    async (queries: {
      page: number;
      limit: number;
    }): Promise<ServiceResponseType> => {
      const count = await this.countProfile();
      return await generatePagination({
        model: Profile,
        userDto: profileDto,
        totalCount: count.count,
        paginationOptions: {
          page: queries.page,
          limit: queries.limit,
        },
      });
    }
  );

  countProfile = warpAsync(async (): Promise<ServiceResponseType> => {
    return serviceResponse({
      count: await Profile.countDocuments(),
    });
  });
}

export default ProfileService;
