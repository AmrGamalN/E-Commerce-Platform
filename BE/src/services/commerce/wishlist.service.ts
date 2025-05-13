import Wishlist from "../../models/mongodb/commerce/wishlist.model";
import {
  WishlistDto,
  WishlistAddDtoType,
  WishlistAddDto,
} from "../../dto/commerce/wishlist.dto";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import { serviceResponse } from "../../utils/response.util";
import { warpAsync } from "../../utils/warpAsync.util";
import { ServiceResponseType } from "../../types/response.type";
import { generatePagination } from "../../utils/generatePagination.util";

class WishlistService {
  private static Instance: WishlistService;
  constructor() {}
  public static getInstance(): WishlistService {
    if (!WishlistService.Instance) {
      WishlistService.Instance = new WishlistService();
    }
    return WishlistService.Instance;
  }

  addWishlist = warpAsync(
    async (
      data: WishlistAddDtoType,
      userId: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: WishlistAddDto,
      });
      if (!validationResult.success) return validationResult;

      const wishList = await Wishlist.findOne({
        userId: userId,
        itemId: data.itemId,
      }).lean();

      if (wishList)
        return serviceResponse({
          statusText: "Conflict",
          message: "Item already in wishList",
        });

      await Wishlist.create({
        userId,
        itemId: data.itemId,
      });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getWishlist = warpAsync(async (_id: string): Promise<ServiceResponseType> => {
    return validateAndFormatData({
      data: await Wishlist.findById({
        _id,
      }).lean(),
      userDto: WishlistDto,
    });
  });

  getAllWishlist = warpAsync(
    async (
      queries: {
        page: number;
        limit: number;
      },
      userId: string
    ): Promise<ServiceResponseType> => {
      const count = await this.countWishlist(userId);
      return await generatePagination({
        model: Wishlist,
        userDto: WishlistDto,
        totalCount: count.count,
        paginationOptions: {
          page: queries.page,
          limit: queries.limit,
        },
        fieldSearch: { userId },
      });
    }
  );

  countWishlist = warpAsync(
    async (userId: string): Promise<ServiceResponseType> => {
      return serviceResponse({
        count: await Wishlist.countDocuments({
          userId,
        }),
      });
    }
  );

  deleteWishlist = warpAsync(
    async (_id: string): Promise<ServiceResponseType> => {
      return serviceResponse({
        deletedCount: (await Wishlist.deleteOne({ _id })).deletedCount,
      });
    }
  );

  clearWishlist = warpAsync(
    async (userId: string): Promise<ServiceResponseType> => {
      return serviceResponse({
        deletedCount: (await Wishlist.deleteMany({ userId })).deletedCount,
      });
    }
  );
}

export default WishlistService;
