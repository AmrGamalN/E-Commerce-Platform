import Review from "../../models/mongodb/commerce/review.model";
import {
  ReviewDto,
  ReviewDtoAddType,
  ReviewAddDto,
} from "../../dto/commerce/review.dto";
import Item from "../../models/mongodb/commerce/item.model";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { warpAsync } from "../../utils/warpAsync.util";
import { ReviewFiltersType, ReviewSortType } from "../../types/filter.type";
import {
  generateFilters,
  generateSort,
} from "../../utils/generateFilter&Sort.util";
import { generatePagination } from "../../utils/generatePagination.util";

class ReviewService {
  private static Instance: ReviewService;

  public static getInstance(): ReviewService {
    if (!ReviewService.Instance) {
      ReviewService.Instance = new ReviewService();
    }
    return ReviewService.Instance;
  }

  addReview = warpAsync(
    async (
      data: ReviewDtoAddType,
      buyerId: string,
      buyerName: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ReviewAddDto,
      });
      if (!validationResult.success) return validationResult;

      const existingReview = await Review.findOne({
        itemId: data.itemId,
        buyerId: buyerId,
      });

      if (existingReview)
        return serviceResponse({
          statusText: "Conflict",
          message: "You already reviewed this item",
        });

      const review = new Review({
        ...data,
        itemId: data.itemId,
        buyerId: buyerId,
        buyerName: buyerName,
        sellerId: undefined,
      });

      const item = await Item.findById({ _id: data.itemId })
        .select("userId")
        .lean();

      if (buyerId === item?.userId)
        return serviceResponse({
          statusText: "Conflict",
          message: "You can't review your own item",
        });

      review.sellerId = item?.userId!;
      await review.save();
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getReview = warpAsync(async (_id: string): Promise<ServiceResponseType> => {
    return validateAndFormatData({
      data: await Review.findById({
        _id,
      }).lean(),
      userDto: ReviewDto,
    });
  });

  getAllReview = warpAsync(
    async (
      queries: ReviewFiltersType,
      sort: ReviewSortType,
      itemId: string
    ): Promise<ServiceResponseType> => {
      const filters = generateFilters<ReviewFiltersType>(queries);
      const count = await this.countReview(itemId, filters, true);
      return await generatePagination({
        model: Review,
        userDto: ReviewDto,
        totalCount: count.count,
        paginationOptions: {
          sort: generateSort<ReviewSortType>(sort),
          page: queries.page,
          limit: queries.limit,
        },
        fieldSearch: { itemId, ...filters },
      });
    }
  );

  countReview = warpAsync(
    async (
      itemId: string,
      queries: ReviewFiltersType,
      filtered?: boolean
    ): Promise<ServiceResponseType> => {
      const filters = filtered
        ? queries
        : generateFilters<ReviewFiltersType>(queries);
      return serviceResponse({
        count: await Review.countDocuments({
          itemId,
          ...filters,
        }),
      });
    }
  );

  updateReview = warpAsync(
    async (
      data: ReviewDtoAddType,
      _id: string,
      userId: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ReviewAddDto,
        actionType: "update",
      });
      const updatedReview = await Review.updateOne(
        {
          _id,
          buyerId: userId,
        },
        {
          $set: validationResult.data,
        }
      );
      return serviceResponse({
        updatedCount: updatedReview.modifiedCount,
      });
    }
  );

  deleteReview = warpAsync(
    async (_id: string, userId: string): Promise<ServiceResponseType> => {
      return serviceResponse({
        deletedCount: (await Review.deleteOne({ _id, buyerId: userId }))
          .deletedCount,
      });
    }
  );

  getReviewAverage = warpAsync(
    async (itemId: string): Promise<ServiceResponseType> => {
      const averageReview = await this.calculateAverageReview(itemId);

      await Item.updateOne(
        { _id:itemId },
        {
          $set: { rate: averageReview },
        }
      );

      return serviceResponse({
        data: averageReview,
      });
    }
  );

  private async calculateAverageReview(
    itemId: string
  ): Promise<{ avgRating: number; rating: number[]; totalReviews: number }> {
    const rating: number[] = [0, 0, 0, 0, 0];
    const titles = ["bad", "average", "good", "veryGood", "excellent"];

    const results = await Review.aggregate([
      { $match: { itemId, title: { $in: titles } } },
      {
        $group: {
          _id: "$title",
          count: { $sum: 1 },
          averageRating: { $avg: "$rate" },
        },
      },
    ]);

    let avgRating = 0;
    const totalReviews = results.reduce((sum, r) => sum + r.count, 0);
    results.forEach((result) => {
      const titleIndex = titles.indexOf(result._id);
      rating[titleIndex] = (result.count / totalReviews) * 100;
      avgRating += (result.averageRating || 0) * (result.count / totalReviews);
    });
    return { avgRating, rating, totalReviews };
  }
}

export default ReviewService;
