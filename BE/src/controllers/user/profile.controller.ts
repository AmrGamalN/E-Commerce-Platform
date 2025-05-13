import { Request, Response } from "express";
import ProfileService from "../../services/user/profile.service";
import { controllerResponse } from "../../utils/response.util";

class ProfileController {
  private static instance: ProfileController;
  private profileService: ProfileService;
  constructor() {
    this.profileService = ProfileService.getInstance();
  }
  static getInstance(): ProfileController {
    if (!ProfileController.instance) {
      ProfileController.instance = new ProfileController();
    }
    return ProfileController.instance;
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    const result = await this.profileService.getProfile(req.params.userId);
    return controllerResponse(res, result);
  }

  async getAllProfiles(req: Request, res: Response): Promise<Response> {
    const result = await this.profileService.getAllProfiles(req.query);
    return controllerResponse(res, result);
  }

  async getProfileByLink(req: Request, res: Response): Promise<Response> {
    const result = await this.profileService.getProfileByLink(req.originalUrl);
    return controllerResponse(res, result);
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    const result = await this.profileService.updateProfile(req.body);
    return controllerResponse(res, result);
  }
}

export default ProfileController;
