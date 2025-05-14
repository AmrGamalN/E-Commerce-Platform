import { warpAsync } from "../../utils/warpAsync.util";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserSecurityDtoType } from "../../dto/user/security.dto";
import User from "../../models/mongodb/user/user.model";
import Profile from "../../models/mongodb/user/profile.model";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
dotenv.config();

class TokenService {
  private static instanceService: TokenService;
  public static getInstance(): TokenService {
    if (!TokenService.instanceService) {
      TokenService.instanceService = new TokenService();
    }
    return TokenService.instanceService;
  }

  generateTempToken = warpAsync(
    async (
      credential: { email: string } | { phoneNumber: string },
      role: string
    ): Promise<ServiceResponseType> => {
      const payload = { ...credential, role: role };
      const tempToken = jwt.sign(
        payload,
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          expiresIn: "5m",
          algorithm: "HS256",
        }
      );
      if (!tempToken)
        return serviceResponse({
          statusText: "Unauthorized",
          message: "Failed to login, please try again later",
        });
      return {
        success: true,
        tempToken: tempToken,
      };
    }
  );

  generateTokens = warpAsync(
    async (userSecurity: UserSecurityDtoType): Promise<ServiceResponseType> => {
      const user = await User.findOne({ userId: userSecurity.userId })
        .select({
          firstName: 1,
          lastName: 1,
          userName: 1,
        })
        .lean();
      const profile = await Profile.findOne({ userId: userSecurity.userId })
        .select({
          profileImage: 1,
        })
        .lean();
      const payload = {
        userId: userSecurity.userId,
        email: userSecurity.email,
        phoneNumber: userSecurity?.phoneNumber,
        role: userSecurity.role,
        name: user?.firstName?.concat(String(user?.lastName)),
        profileImage: profile?.profileImage,
        userName: profile?.userName,
        dateOfJoining: userSecurity.dateOfJoining,
        sign_up_provider: userSecurity.sign_up_provider,
        sign_in_provider: userSecurity.sign_in_provider,
        isEmailVerified: userSecurity.isEmailVerified,
        lastSeen: new Date().toISOString(),
      };

      const accessToken = jwt.sign(
        payload,
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          expiresIn: "60m",
          algorithm: "HS256",
        }
      );

      const refreshToken = jwt.sign(
        payload,
        String(process.env.REFRESH_TOKEN_SECRET),
        {
          expiresIn: "14d",
          algorithm: "HS256",
        }
      );

      return {
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
  );

  verifyTempToken = warpAsync(
    async (authHeader: string): Promise<ServiceResponseType> => {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET),
        {
          algorithms: ["HS256"],
        }
      );

      if (!decoded)
        return serviceResponse({
          statusText: "Unauthorized",
          message: "Two-factor authentication failed. please try again later",
        });
      return { success: true };
    }
  );
}

export default TokenService;
