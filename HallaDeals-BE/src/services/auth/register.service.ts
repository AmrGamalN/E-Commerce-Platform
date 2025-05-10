import User from "../../models/mongodb/user/user.model";
import Otp from "../../models/mongodb/user/otp.model";
import Profile from "../../models/mongodb/user/profile.model";
import Security from "../../models/mongodb/user/security.model";
import { RegisterDtoType, RegisterDto } from "../../dto/auth/register.dto";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import { auth } from "../../config/firebase";
import { redisClient } from "../../config/redisConfig";
import { sendEmail, sendVerificationEmail } from "../../utils/sendEmail";
import { generateVerificationToken } from "../../utils/generateCode";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class RegisterService {
  private static instanceService: RegisterService;
  public static getInstance(): RegisterService {
    if (!RegisterService.instanceService) {
      RegisterService.instanceService = new RegisterService();
    }
    return RegisterService.instanceService;
  }

  register = warpAsync(
    async (userData: RegisterDtoType): Promise<responseHandler> => {
      if (userData.password !== userData.confirmPassword)
        return serviceResponse({
          statusText: "BadRequest",
          message: "Password and Confirm Password do not match.",
        });

      const formatData = validateAndFormatData(userData, RegisterDto);
      if (!formatData.success) return formatData;

      const existingUser = await this.isUserExisting(
        userData.email,
        String(userData.phoneNumber)
      );
      if (!existingUser.success) return existingUser;

      // Add user caching & send otp
      const resultRegister = await this.processUserRegistration(
        formatData.data
      );
      if (!resultRegister.success) return resultRegister;

      return resultRegister;
    }
  );

  private isUserExisting = async (
    email: string,
    phoneNumber: string
  ): Promise<responseHandler> => {
    const getUserByEmail = await auth.getUserByEmail(email).catch(() => null);
    const getUserByPhone = await auth
      .getUserByPhoneNumber(phoneNumber)
      .catch(() => null);
    if (getUserByEmail)
      return serviceResponse({
        statusText: "Conflict",
        message: "Email already exists",
      });

    if (getUserByPhone)
      return serviceResponse({
        statusText: "Conflict",
        message: "Phone already exists",
      });
    return { success: true };
  };

  private processUserRegistration = async (
    userData: RegisterDtoType
  ): Promise<responseHandler> => {
    const token = await this.generateUniqueToken();
    const existingOtp = await Otp.findOne({ email: userData.email }).lean();
    if (existingOtp) {
      return serviceResponse({
        statusText: "Conflict",
        message:
          "verification link already exists or the email already register but not verify. Please check your email",
      });
    } else {
      await Otp.create({
        email: userData.email,
        token,
        expiresAt: new Date(Date.now() + 20 * 60 * 1000),
      });
    }

    const verificationLink = `${process.env.BACKEND_URL}/auth/verify-email/${token}`;
    const resultSendEmail = await sendVerificationEmail(
      String(userData.email),
      "Verify Your Email",
      sendEmail(verificationLink, userData.firstName + " " + userData.lastName)
    );
    if (!resultSendEmail.success) return resultSendEmail;

    const resultCache = await this.saveUserInCache(userData, token);
    if (!resultCache.success) return resultCache;

    return serviceResponse({
      statusText: "OK",
      message: "Registration successful. Please verify email",
    });
  };

  private async generateUniqueToken(): Promise<string> {
    let token;
    do {
      token = generateVerificationToken();
    } while (await Otp.exists({ token }));
    return token;
  }

  private saveUserInCache = async (
    userData: RegisterDtoType,
    token: string
  ): Promise<responseHandler> => {
    const result = await redisClient.setEx(
      `token: ${token}`,
      1200,
      JSON.stringify(userData)
    );

    if (result !== "OK") {
      return {
        success: false,
        status: 500,
        message: "Failed to create user",
      };
    }
    return { success: true };
  };

  private addUserToDatabaseAndFirebase = async (
    token: string
  ): Promise<responseHandler> => {
    // Find and delete token
    const getOtp = await Otp.findOneAndDelete({ token });
    const getUserFromCaching = await redisClient.get(`token: ${token}`);
    if (
      !getOtp ||
      getOtp.token != token ||
      !getUserFromCaching ||
      getUserFromCaching?.length === 0
    )
      return serviceResponse({
        statusText: "BadRequest",
        message:
          "Try verifying your email again ,Your request to verify your email has expired or the link has already been used",
      });

    const userData = JSON.parse(getUserFromCaching);
    const {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      gender,
      terms,
      accountType,
    } = userData;

    const [firebaseUser] = await Promise.all([
      auth.createUser({
        email,
        password,
        ...(phoneNumber ? { phoneNumber } : {}),
      }),
    ]);

    const uid = firebaseUser.uid;
    const prefixS3 = uuidv4();
    await Promise.all([
      User.create({ userId: uid, firstName, lastName, gender }),
      Security.create({
        userId: uid,
        email,
        phoneNumber,
        password: await bcrypt.hash(password, 10),
        isEmailVerified: true,
        dateOfJoining: Date.now(),
        terms,
      }),
      Profile.create({ userId: uid, accountType, prefixS3 }),
      redisClient.del(`token:${token}`),
    ]);
    return serviceResponse({
      statusText: "Created",
    });
  };

  async verifyEmail(token: string): Promise<responseHandler> {
    const result = await this.addUserToDatabaseAndFirebase(token);
    if (!result.success) return result;
    return result;
  }
}

export default RegisterService;
