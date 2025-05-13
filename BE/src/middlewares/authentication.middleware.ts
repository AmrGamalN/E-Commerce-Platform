import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { decrypt, encrypt } from "../utils/encryption.util";
import { auth } from "../config/firebase";
import { UserRequestType, UserRoleType } from "../types/request.type";
import { CustomError } from "../utils/customError";
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    curUser?: UserRequestType;
    decode?: any;
    userId?: string;
  }
}

class TokenMiddleware {
  private static Instance: TokenMiddleware;

  public static getInstance() {
    if (!TokenMiddleware.Instance) {
      TokenMiddleware.Instance = new TokenMiddleware();
    }
    return TokenMiddleware.Instance;
  }

  public authorizationMiddleware(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!role.includes(req?.curUser?.role!))
        throw new CustomError(
          "unauthorized: Access denied",
          "Forbidden",
          false,
          403
        );
      return next();
    };
  }

  verifyTempToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const token = req.cookies?.tempToken;
    const decoded = jwt.verify(
      decrypt(token),
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        algorithms: ["HS256"],
      }
    );
    if (!decoded)
      throw new CustomError(
        "Unauthorized: Invalid refresh token",
        "Unauthorized",
        false,
        401
      );
    return next();
  };

  async verifyIdTokenFirebase(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const idToken = req.body.idToken;
    const decode = await auth.verifyIdToken(idToken);
    if (!decode) {
      throw new CustomError(
        "Unauthorized: Invalid refresh token",
        "Unauthorized",
        false,
        401
      );
    }
    req.decode = decode;
    return next();
  }

  async refreshTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      throw new CustomError(
        "Unauthorized: Invalid refresh token",
        "Unauthorized",
        false,
        401
      );

    if (accessToken) {
      try {
        const decoded = jwt.verify(
          decrypt(accessToken),
          String(process.env.ACCESS_TOKEN_SECRET)
        );
        req.curUser = decoded as UserRequestType;
        return next();
      } catch (err) {}
    }

    const decoded = jwt.verify(
      decrypt(refreshToken),
      String(process.env.REFRESH_TOKEN_SECRET)
    );

    if (typeof decoded !== "object")
      throw new CustomError(
        "Unauthorized: Invalid refresh token",
        "Unauthorized",
        false,
        401
      );

    const { iat, exp, ...payload } = decoded;
    const newAccessToken = jwt.sign(
      payload,
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", encrypt(newAccessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    req.curUser = payload as UserRequestType;
    return next();
  }
}
export default TokenMiddleware;
