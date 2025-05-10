import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { decrypt, encrypt } from "../utils/encryptionAES";
import { auth } from "../config/firebase";
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    curUser?: any;
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

  // Authorization middleware & allow to
  public authorizationMiddleware(role: string[]) {
    try {
      return async (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.curUser?.role;
        if (!userRole) {
          res.status(401).json({ error: "unauthorized: No user role found" });
          return;
        }
        if (!role.includes(userRole)) {
          res.status(403).json({ error: "Forbidden: Access denied" });
          return;
        }
        return next();
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Internal server error"
      );
    }
  }

  // Verify temporarily token
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
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: No temp token." });
    }
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
      return res
        .status(401)
        .json({ message: "Unauthorized: No refresh token." });
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

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No refresh token." });
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(
          decrypt(accessToken),
          String(process.env.ACCESS_TOKEN_SECRET)
        );
        req.curUser = decoded;
        return next();
      } catch (err) {}
    }

    try {
      const decoded = jwt.verify(
        decrypt(refreshToken),
        String(process.env.REFRESH_TOKEN_SECRET)
      );

      if (typeof decoded !== "object" || decoded === null) {
        return res
          .status(401)
          .json({ message: "Invalid or expired refresh token." });
      }

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

      req.curUser = payload;
      return next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token." });
    }
  }
}
export default TokenMiddleware;
