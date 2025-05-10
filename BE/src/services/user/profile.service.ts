import Profile from "../../models/mongodb/user/profile.model";
import {
  profileDto,
  profileUpdateDto,
  ProfileUpdateDtoType,
} from "../../dto/user/profile.dto";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import { Pagination } from "../../utils/pagination";

class ProfileService {
  private static instanceService: ProfileService;
  public static getInstance(): ProfileService {
    if (!ProfileService.instanceService) {
      ProfileService.instanceService = new ProfileService();
    }
    return ProfileService.instanceService;
  }

  updateProfile = warpAsync(
    async (
      profileData: ProfileUpdateDtoType,
      query: object
    ): Promise<responseHandler> => {
      const parseSafe = validateAndFormatData(
        profileData,
        profileUpdateDto,
        "update"
      );
      if (!parseSafe.success) return parseSafe;

      const isUserName = await Profile.exists({
        userName: profileData.userName,
      });

      if (isUserName)
        return serviceResponse({
          statusText: "Conflict",
          message: "User name already exists",
        });

      const updateProfile = await Profile.findOneAndUpdate(
        query,
        {
          $set: {
            ...parseSafe.data,
            profileLink: `${process.env.BACKEND_URL}/user/profile/${profileData.userName}`,
          },
        },
        {
          new: true,
        }
      ).lean();
      return serviceResponse({
        data: updateProfile,
      });
    }
  );

  getProfileByLink = warpAsync(
    async (link: string): Promise<responseHandler> => {
      const getProfile = await Profile.findOne({
        profileLink: process.env.BACKEND_URL + link,
      }).lean();
      return validateAndFormatData(getProfile, profileDto);
    }
  );

  getProfile = warpAsync(async (query: object): Promise<responseHandler> => {
    const getProfile = await Profile.findOne(query).lean();
    return validateAndFormatData(getProfile, profileDto);
  });

  getAllProfiles = warpAsync(
    async (args: { page: number; limit: number }): Promise<responseHandler> => {
      const count = await this.countProfile();
      return Pagination(Profile, profileDto, count.count ?? 0, args);
    }
  );

  countProfile = warpAsync(async (): Promise<responseHandler> => {
    return serviceResponse({
      count: await Profile.countDocuments(),
    });
  });
}

export default ProfileService;
