import { Request, Response } from "express";
import UserService from "../../services/user/user.service";
import { controllerResponse } from "../../utils/responseHandler";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      name: string;
      role: string;
      email: string;
      lastLogin: Date;
      lastSeen: Date;
    };
  }
}

class UserController {
  private static instance: UserController;
  private userService: UserService;
  constructor() {
    this.userService = UserService.getInstance();
  }
  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const result = await this.userService.getUser(req.body.id);
    return controllerResponse(res, result);
  }

  async getMe(req: Request, res: Response): Promise<Response> {
    const result = await this.userService.getMe(req.curUser);
    return controllerResponse(res, result);
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const result = await this.userService.getAllUsers(req.query);
    return controllerResponse(res, result);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const result = await this.userService.updateUser(req.body, req.body.id);
    return controllerResponse(res, result);
  }
}

export default UserController;
