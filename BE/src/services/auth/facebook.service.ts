import Security from "../../models/mongodb/user/security.model";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import dotenv from "dotenv";
import TokenService from "../../services/auth/token.service";
import User from "../../models/mongodb/user/user.model";
import Profile from "../../models/mongodb/user/profile.model";
dotenv.config();

class FacebookService {
  private static instanceService: FacebookService;
  private tokenService: TokenService;
  constructor() {
    this.tokenService = TokenService.getInstance();
  }
  public static getInstance(): FacebookService {
    if (!FacebookService.instanceService) {
      FacebookService.instanceService = new FacebookService();
    }
    return FacebookService.instanceService;
  }

  registerByFacebook = warpAsync(
    async (user: any): Promise<ServiceResponseType> => {
      await this.handleFacebook(user);
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  loginByFacebook = warpAsync(
    async (user: any): Promise<ServiceResponseType> => {
      await this.handleFacebook(user);
      const userSecurity = await Security.findOne({ email: user.email })
        .select("email")
        .lean();
      if (!userSecurity)
        return serviceResponse({
          statusText: "NotFound",
          message: "Account not found",
        });
      const tokens = await this.tokenService.generateTokens(userSecurity);
      return serviceResponse({
        statusText: "OK",
        message: "Login successful",
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          userId: userSecurity.userId,
        },
      });
    }
  );

  private handleFacebook = async (user: any): Promise<void> => {
    const isExistUser = await Security.exists({ email: user.email });
    if (!isExistUser) {
      await User.create({
        userId: user.uid,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
      });

      await Security.create({
        userId: user.uid,
        email: user.email,
        isEmailVerified: true,
        dateOfJoining: Date.now(),
        terms: true,
        sign_up_provider: "facebook",
        password: " ",
      });

      await Profile.create({
        userId: user.uid,
        accountType: "personal",
        profileImage: { imageUrl: user.picture },
      });
    }
  };
}

export default FacebookService;
