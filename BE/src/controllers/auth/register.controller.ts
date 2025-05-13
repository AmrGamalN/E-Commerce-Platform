import { Request, Response } from "express";
import RegisterService from "../../services/auth/register.service";
import FacebookService from "../../services/auth/facebook.service";
import GoogleService from "../../services/auth/google.service";
import { controllerResponse } from "../../utils/response.util";

class RegisterController {
  private static instance: RegisterController;
  private registerService: RegisterService;
  private facebookService: FacebookService;
  private googleService: GoogleService;
  constructor() {
    this.registerService = RegisterService.getInstance();
    this.facebookService = FacebookService.getInstance();
    this.googleService = GoogleService.getInstance();
  }
  static getInstance(): RegisterController {
    if (!RegisterController.instance) {
      RegisterController.instance = new RegisterController();
    }
    return RegisterController.instance;
  }

  // Main register
  async register(req: Request, res: Response): Promise<Response> {
    const result = await this.registerService.register(req.body);
    return controllerResponse(res, result);
  }

  async registerByFacebook(req: Request, res: Response): Promise<Response> {
    const result = await this.facebookService.registerByFacebook(req.decode);
    return controllerResponse(res, result);
  }

  async registerByGoogle(req: Request, res: Response): Promise<Response> {
    const result = await this.googleService.registerByGoogle(req.decode);
    return controllerResponse(res, result);
  }

  async verifyEmail(req: Request, res: Response): Promise<Response> {
    const result = await this.registerService.verifyEmail(req.params.token);
    return controllerResponse(res, result);
  }
}

export default RegisterController;
