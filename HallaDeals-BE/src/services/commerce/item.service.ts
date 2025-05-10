import Item from "../../models/mongodb/commerce/item.model";
import {
  ItemDto,
  ItemAddDto,
  ItemAddDtoType,
  ItemUpdateDtoType,
  ItemUpdateDto,
} from "../../dto/commerce/item.dto";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import { Pagination } from "../../utils/pagination";
import Address from "../../models/mongodb/user/address.model";
import { v4 as uuidv4 } from "uuid";

class ItemService {
  private static Instance: ItemService;
  constructor() {}
  public static getInstance(): ItemService {
    if (!ItemService.Instance) {
      ItemService.Instance = new ItemService();
    }
    return ItemService.Instance;
  }

  addItem = warpAsync(
    async (data: ItemAddDtoType, curUser: any): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, ItemAddDto);
      const prefixS3 = uuidv4();
      await Item.create({
        ...parsed.data,
        userId: curUser.userId,
        userName: curUser.name,
        userImage: curUser.profileImage?.imageUrl,
        phone: curUser?.phone,
        prefixS3,
      });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getItem = warpAsync(async (query: object): Promise<responseHandler> => {
    const retrievedItem = await Item.findOne(query).lean();
    const item = validateAndFormatData(retrievedItem, ItemDto);
    let itemData =item.data;
    const address = await Address.findOne({
      _id: item?.data?.location,
    }).lean();

    if (address) {
      itemData = {
        location: address,
      };
    }

    return serviceResponse({
      statusText: "OK",
      data: itemData,
    });
  });

  getAllItem = warpAsync(
    async (args: { page: number; limit: number }): Promise<responseHandler> => {
      const count = await this.countItems();
      return Pagination(Item, ItemDto, count.count ?? 0, args);
    }
  );

  getItemByCategoryId = warpAsync(
    async (categoryId: String): Promise<responseHandler> => {
      const filter = { categoryId: categoryId };
      return await this.fetchItemsWithFilters(filter);
    }
  );

  getItemBySubCategoryId = warpAsync(
    async (SubCategoryId: String): Promise<responseHandler> => {
      const filter = { subCategoryId: SubCategoryId };
      return await this.fetchItemsWithFilters(filter);
    }
  );

  updateItem = warpAsync(
    async (
      data: ItemUpdateDtoType,
      query: object
    ): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, ItemUpdateDto, "update");
      if (!parsed.success) return parsed;

      let angles: number[] = [];
      let keys: string[] = [];

      const {
        keysImageUnchanged = [],
        itemImages = [],
        ...itemData
      } = parsed.data;

      let updatedItem;
      if (itemData || keysImageUnchanged > 0) {
        keysImageUnchanged?.map((image: any) => {
          keys.push(image.key);
          angles.push(image.angle);
        });
        [updatedItem] = await Promise.all([
          Item.findOneAndUpdate(
            query,
            {
              $set: {
                ...itemData,
              },
            },
            { new: true }
          ),
          Item.bulkWrite(
            keys.map((key, index) => ({
              updateOne: {
                filter: {
                  query,
                  "itemImages.key": key,
                },
                update: {
                  $set: {
                    "itemImages.$.angles": angles[index],
                  },
                },
              },
            }))
          ),
        ]);
      }

      if (itemImages?.length > 0) {
        const newImage = {
          $push: {
            itemImages: {
              $each: itemImages,
            },
          },
        };
        updatedItem = await Item.findOneAndUpdate(query, newImage, {
          new: true,
        });
      }
      return serviceResponse({
        data: updatedItem,
      });
    }
  );

  deleteImages = warpAsync(
    async (
      deleteImageKeys: string[],
      query: object
    ): Promise<responseHandler> => {
      if (deleteImageKeys?.length > 0) {
        await Item.updateOne(query, {
          $pull: {
            itemImages: {
              key: { $in: deleteImageKeys },
            },
          },
        });
      }
      return serviceResponse({
        statusText: "OK",
        message: "Delete image",
      });
    }
  );

  countItems = warpAsync(async (): Promise<responseHandler> => {
    return serviceResponse({
      count: await Item.countDocuments(),
    });
  });

  deleteItem = warpAsync(async (query: object): Promise<responseHandler> => {
    return serviceResponse({
      deleteCount: (await Item.deleteOne(query)).deletedCount,
    });
  });

  private fetchItemsWithFilters = warpAsync(
    async (
      filter: Record<string, unknown>,
      args: { page: number; limit: number }
    ): Promise<responseHandler> => {
      const count = await this.countItems();
      return Pagination(
        Item,
        ItemDto,
        Number(count.count),
        args,
        filter,
        "filter"
      );
    }
  );

  filterItem = warpAsync(
    async (filters: Record<string, any>): Promise<responseHandler> => {
      const query: Record<string, any> = {};
      const ratingIndexMap: Record<string, number> = {
        bad: 0,
        average: 1,
        good: 2,
        very_good: 3,
        excellent: 4,
      };

      if (filters.avgRating) {
        query["rate.avgRating"] = { $gte: filters.avgRating };
      }

      if (filters.title && ratingIndexMap[filters.title] !== undefined) {
        const index = ratingIndexMap[filters.title];
        query[`rate.rating.${index}`] = { $gte: 1 };
      }

      if (filters.communications?.length) {
        query["communications"] = { $in: filters.communications };
      }

      if (filters.color?.length) {
        query["color"] = { $in: filters.color };
      }

      if (filters.min && filters.max) {
        query["price"] = {
          $gte: Number(filters.min),
          $lte: Number(filters.max),
        };
      }

      if (filters.from && filters.to) {
        query["createdAt"] = {
          $gte: new Date(filters.from),
          $lte: new Date(filters.to),
        };
      }
      if (filters.discount)
        query["isDiscount"] = filters.discount == "true" ? true : false;

      if (filters.allowNegotiate)
        query["allowNegotiate"] =
          filters.allowNegotiate == "true" ? true : false;

      const stringFilters: (keyof typeof filters)[] = [
        "category",
        "subcategory",
        "brand",
        "type",
        "condition",
        "location",
        "size",
        "material",
      ];

      for (const key of stringFilters) {
        if (filters[key]) {
          query[key] = filters[key];
        }
      }
      return await this.fetchItemsWithFilters(query, filters);
    }
  );
}

export default ItemService;
