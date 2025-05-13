import { Request, Response } from "express";
import ReviewService from "../../services/commerce/review.service";
import { controllerResponse } from "../../utils/response.util";

class ReviewController {
  private static Instance: ReviewController;
  private serviceInstance: ReviewService;
  constructor() {
    this.serviceInstance = ReviewService.getInstance();
  }

  public static getInstance(): ReviewController {
    if (!ReviewController.Instance) {
      ReviewController.Instance = new ReviewController();
    }
    return ReviewController.Instance;
  }

  async addReview(req: Request, res: Response): Promise<Response> {
    const retrievedReview = await this.serviceInstance.addReview(
      req.body,
      req.curUser?.userId,
      req.curUser?.name
    );
    return controllerResponse(res, retrievedReview);
  }

  async getReview(req: Request, res: Response): Promise<Response> {
    const retrievedReview = await this.serviceInstance.getReview(req.params.id);
    return controllerResponse(res, retrievedReview);
  }

  async getAllReview(req: Request, res: Response): Promise<Response> {
    const { createdAt, ...filters } = req.query;
    const sort = { createdAt };
    const retrievedReview = await this.serviceInstance.getAllReview(
      filters,
      sort,
      req.params.id
    );
    return controllerResponse(res, retrievedReview);
  }

  async updateReview(req: Request, res: Response): Promise<Response> {
    const retrievedReview = await this.serviceInstance.updateReview(
      req.body,
      req.params.id,
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedReview);
  }

  async countReview(req: Request, res: Response): Promise<Response> {
    const count = await this.serviceInstance.countReview(
      req.params.id,
      req.query
    );
    return controllerResponse(res, count);
  }

  async deleteReview(req: Request, res: Response): Promise<Response> {
    const retrievedReview = await this.serviceInstance.deleteReview(
      req.params.id,
      req.curUser?.userId
    );
    return controllerResponse(res, retrievedReview);
  }

  async getReviewAverage(req: Request, res: Response): Promise<Response> {
    const retrievedReview = await this.serviceInstance.getReviewAverage(
      req.params.id
    );
    return controllerResponse(res, retrievedReview);
  }
}

export default ReviewController;
