import { Request, Response } from "express";
import SecurityService from "../../services/user/security.service";
import { controllerResponse } from "../../utils/responseHandler";

class SecurityController {
  private static instance: SecurityController;
  private SecurityService: SecurityService;
  constructor() {
    this.SecurityService = SecurityService.getInstance();
  }
  static getInstance(): SecurityController {
    if (!SecurityController.instance) {
      SecurityController.instance = new SecurityController();
    }
    return SecurityController.instance;
  }

  async getSecurity(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.getSecurity(req.body.id);
    return controllerResponse(res, result);
  }

  async getAllSecurities(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.getAllSecurities(req.query);
    return controllerResponse(res, result);
  }

  async updateSecurity(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.updateSecurity(
      req.body,
      req.body.id
    );
    return controllerResponse(res, result);
  }

  async countSecurity(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.countSecurity();
    return controllerResponse(res, result);
  }

  async deleteBlockUser(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.deleteBlockUser(
      req.body.id,
      req.body.block !== undefined
        ? { isAccountBlocked: req.body.block }
        : { isAccountDeleted: req.body.delete }
    );
    return controllerResponse(res, result);
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.resetPassword(req.body.email);
    return controllerResponse(res, result);
  }

  async updatePassword(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.updatePassword(
      req.body.id,
      req.body.password
    );
    return controllerResponse(res, result);
  }

  async sendVerificationEmail(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.sendVerificationEmail(
      req.body.email
    );
    return controllerResponse(res, result);
  }

  async generateTwoFactorAuth(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.generateTwoFactorAuth(
      req.body.id
    );
    if (!result.success || !result) return res.status(400).json(result);
    res.setHeader("Content-type", "image/png");
    res.setHeader("Content-Disposition", "inline;filename=QRcode.png");
    return res.send(result.data.qrCode);
  }

  async verifyTwoFactorAuth(req: Request, res: Response): Promise<Response> {
    const result = await this.SecurityService.verifyTwoFactorAuth(
      req.body.id,
      req.body.twoFactorCode
    );
    return controllerResponse(res, result);
  }
}

export default SecurityController;
