import Security from "../../models/mongodb/user/security.model";
import {
  UserSecurityDto,
  UserSecurityUpdateDto,
  UserSecurityUpdateDtoType,
} from "../../dto/user/security.dto";
import { warpAsync } from "../../utils/warpAsync";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import { auth } from "../../config/firebase";
import {
  resetEmail,
  sendEmail,
  sendVerificationEmail,
} from "../../utils/sendEmail";
import { generateVerificationToken } from "../../utils/generateCode";
import Otp from "../../models/mongodb/user/otp.model";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { Pagination } from "../../utils/pagination";

class SecurityService {
  private static instanceService: SecurityService;
  public static getInstance(): SecurityService {
    if (!SecurityService.instanceService) {
      SecurityService.instanceService = new SecurityService();
    }
    return SecurityService.instanceService;
  }

  getSecurity = warpAsync(async (query: object): Promise<responseHandler> => {
    const getSecurity = await Security.findOne(query).lean();
    return validateAndFormatData(getSecurity, UserSecurityDto);
  });

  getAllSecurities = warpAsync(
    async (args: { page: number; limit: number }): Promise<responseHandler> => {
      const count = await this.countSecurity();
      return Pagination(Security, UserSecurityDto, count.count ?? 0, args);
    }
  );

  updateSecurity = warpAsync(
    async (
      SecurityData: UserSecurityUpdateDtoType,
      query: object
    ): Promise<responseHandler> => {
      const parseSafe = validateAndFormatData(
        SecurityData,
        UserSecurityUpdateDto,
        "update"
      );
      if (!parseSafe.success) return parseSafe;

      const updateSecurity = await Security.findOneAndUpdate(
        query,
        {
          $set: {
            ...parseSafe.data,
          },
        },
        {
          new: true,
        }
      ).lean();

      return serviceResponse({
        data: updateSecurity,
      });
    }
  );

  countSecurity = warpAsync(async (): Promise<responseHandler> => {
    return serviceResponse({
      count: await Security.countDocuments(),
    });
  });

  deleteBlockUser = warpAsync(
    async (userId: string, processType: object): Promise<responseHandler> => {
      const getUser = await Security.findOneAndUpdate(
        { userId },
        {
          $set: processType,
        },
        {
          new: true,
        }
      ).lean();
      return serviceResponse({
        data: getUser,
      });
    }
  );

  resetPassword = warpAsync(async (email: string): Promise<responseHandler> => {
    const passwordResetLink = await auth.generatePasswordResetLink(email);
    if (!passwordResetLink)
      return serviceResponse({
        statusText: "NotFound",
        message: "Invalid email",
      });

    const sendLink = await sendVerificationEmail(
      email,
      "Reset password",
      resetEmail(passwordResetLink, email)
    );

    if (!sendLink.success)
      return serviceResponse({
        statusText: "BadRequest",
        message: "Something error, Please try aging",
      });

    return serviceResponse({
      statusText: "OK",
      message:
        "Send link to your email ,Please check your email to reset password",
      data: passwordResetLink,
    });
  });

  updatePassword = warpAsync(
    async (userId: string, newPassword: string): Promise<responseHandler> => {
      const updatedUser = await auth.updateUser(userId, {
        password: newPassword,
      });
      if (!updatedUser)
        return serviceResponse({
          statusText: "NotFound",
          message: "User not found",
        });
      return serviceResponse({
        statusText: "OK",
        data: updatedUser,
      });
    }
  );

  sendVerificationEmail = warpAsync(
    async (email: string): Promise<responseHandler> => {
      const token = await this.generateUniqueToken();
      const existingOtp = await Otp.findOne({ email }).lean();

      if (existingOtp)
        return serviceResponse({
          statusText: "BadRequest",
          message:
            "verification link already exists or the email already register but not verify. Please check your email",
        });
      else {
        await Otp.create({
          email,
          token,
          expiresAt: new Date(Date.now() + 20 * 60 * 1000),
        });
      }

      const verificationLink = `${process.env.BACKEND_URL}/security/send/${token}`;
      const resultSendEmail = await sendVerificationEmail(
        email,
        "Verify Your Email",
        sendEmail(verificationLink, email)
      );
      if (!resultSendEmail.success) return resultSendEmail;
      return serviceResponse({
        statusText: "OK",
        message: `Otp sended successfully please check your email ${email}`,
      });
    }
  );

  // Create unique token
  private async generateUniqueToken(): Promise<string> {
    let token;
    do {
      token = generateVerificationToken();
    } while (await Otp.exists({ token }));
    return token;
  }

  generateTwoFactorAuth = warpAsync(
    async (userId: string): Promise<responseHandler> => {
      const getUserSecurity = await Security.findOne({
        userId,
        isTwoFactorAuth: { $ne: true },
      }).lean();

      if (
        getUserSecurity?.twoFactorCode != "" &&
        getUserSecurity?.isTwoFactorAuth == true
      )
        return serviceResponse({
          statusText: "Conflict",
          message: `2FA already enable`,
        });

      const secret = speakeasy.generateSecret({
        name: `Halla Deals ${userId}`,
        length: 20,
      });

      const updatedUser = await Security.updateOne(
        { userId, isTwoFactorAuth: { $ne: true } },
        { $set: { twoFactorCode: secret.base32 } }
      ).lean();

      if (!updatedUser || !secret.otpauth_url)
        return serviceResponse({
          statusText: "BadRequest",
          message: `Error creating two-factor authentication`,
        });

      const generateQrCode = await QRCode.toBuffer(secret.otpauth_url);
      return serviceResponse({
        statusText: "OK",
        message: `Scan the QR code to set up 2FA. After scanning, enter the 6-digit code to complete verification.`,
        data: {
          qrCode: generateQrCode,
        },
      });
    }
  );

  verifyTwoFactorAuth = warpAsync(
    async (userId: string, twoFactorCode: string): Promise<responseHandler> => {
      const userSecurity = await Security.findOne({
        userId,
      })
        .select({
          twoFactorCode: 1,
          isTwoFactorAuth: 1,
        })
        .lean();

      if (userSecurity && userSecurity.isTwoFactorAuth === true)
        return serviceResponse({
          statusText: "Conflict",
          message: `Two factor already enable`,
        });
      if (userSecurity?.twoFactorCode == "")
        return serviceResponse({
          statusText: "BadRequest",
          message: "2FA not enabled",
        });

      const verified = speakeasy.totp.verify({
        secret: String(userSecurity?.twoFactorCode),
        token: twoFactorCode,
        encoding: "base32",
        window: 1,
      });
      if (!verified)
        return serviceResponse({
          statusText: "BadRequest",
          message: "Invalid or expired 2FA code",
        });

      await Security.findOneAndUpdate(
        { userId },
        { $set: { isTwoFactorAuth: true } }
      );
      return serviceResponse({
        statusText: "OK",
        message: "Invalid or expired 2FA code",
      });
    }
  );
}

export default SecurityService;
