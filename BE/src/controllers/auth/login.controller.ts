import { Request, Response } from "express";
import loginService from "../../services/auth/login.service";
import { auth } from "../../config/firebase";
import { encrypt } from "../../utils/encryption.util";
import FacebookService from "../../services/auth/facebook.service";
import GoogleService from "../../services/auth/google.service";

class LoginController {
  private static instance: LoginController;
  private loginService: loginService;
  private facebookService: FacebookService;
  private googleService: GoogleService;

  constructor() {
    this.loginService = loginService.getInstance();
    this.facebookService = FacebookService.getInstance();
    this.googleService = GoogleService.getInstance();
  }
  static getInstance(): LoginController {
    if (!LoginController.instance) {
      LoginController.instance = new LoginController();
    }
    return LoginController.instance;
  }

  async loginByEmail(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authResult = await this.loginService.Login(password, email, null);
    if (!authResult.success) return res.status(200).json(authResult);
    const { data, ...responseData } = authResult;
    this.generateCookies(res, data);
    this.loginService.updateUserStatus(data.userId, "active", "email");
    return res.status(200).json(responseData);
  }

  async loginByPhone(req: Request, res: Response): Promise<Response> {
    const { phoneNumber, password } = req.body;
    const authResult = await this.loginService.Login(
      password,
      null,
      phoneNumber
    );
    if (!authResult.success) return res.status(200).json(authResult);
    const { data, ...responseData } = authResult;
    this.generateCookies(res, data);
    this.loginService.updateUserStatus(data.userId, "active", "phone");
    return res.status(200).json(responseData);
  }

  async loginByFacebook(req: Request, res: Response): Promise<Response> {
    const user = req.decode;
    const authResult = await this.facebookService.loginByFacebook(user);
    if (!authResult.success) return res.status(200).json(authResult);
    const { data, ...responseData } = authResult;
    this.generateCookies(res, data);
    this.loginService.updateUserStatus(data.userId, "active", "facebook");
    return res.status(200).json(responseData);
  }

  async loginByGoogle(req: Request, res: Response): Promise<Response> {
    const user = req.decode;
    const authResult = await this.googleService.loginByGoogle(user);
    if (!authResult.success) return res.status(200).json(authResult);
    const { data, ...responseData } = authResult;
    this.generateCookies(res, data);
    this.loginService.updateUserStatus(data.userId, "active", "gmail");
    return res.status(200).json(responseData);
  }

  async verifyTwoFactorAuthentication(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { twoFactorCode } = req.body;
    const authResult = await this.loginService.verifyTwoFactorAuthentication(
      req.curUser,
      twoFactorCode
    );
    if (!authResult.success) return res.status(400).json(authResult);

    const { data, ...responseData } = authResult;
    this.generateCookies(res, data);
    this.loginService.updateUserStatus(data.userId, "active", "email");
    return res.status(200).json(responseData);
  }

  async logOut(req: Request, res: Response): Promise<Response> {
    ["accessToken", "refreshToken"].forEach((cookieName) => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    });
    await auth.revokeRefreshTokens(req.curUser?.userId!);
    this.loginService.updateUserStatus(req.curUser?.userId, "inactive");
    return res.status(200).json({
      message: "Logged out successfully",
    });
  }

  private generateCookies(
    res: Response,
    data: { refreshToken?: string; accessToken?: string; tempToken?: string }
  ) {
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      httpOnly: true,
      sameSite: isProduction ? ("none" as "none") : ("lax" as "lax"),
      secure: isProduction,
    };
    const tokens = [
      {
        name: "refreshToken",
        value: data.refreshToken,
        expires: 60 * 24 * 14,
      },
      {
        name: "accessToken",
        value: data.accessToken,
        expires: 60,
      },
      {
        name: "tempToken",
        value: data.tempToken,
        expires: 15,
      },
    ];

    tokens.forEach((token) => {
      if (token.value != undefined) {
        res.cookie(token.name, encrypt(String(token.value)), {
          ...options,
          expires: new Date(Date.now() + 1000 * 60 * token.expires),
        });
      }
    });
  }
}

export default LoginController;
