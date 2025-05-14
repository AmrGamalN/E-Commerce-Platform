import DraftItem from "../../models/mongodb/commerce/draftItem.model";
import {
  ItemDraftDto,
  ItemDraftDtoType,
} from "../../dto/commerce/draftItem.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import { v4 as uuidv4 } from "uuid";
import {
  generateFilters,
  generateSort,
} from "../../utils/generateFilter&Sort.util";
import { generatePagination } from "../../utils/generatePagination.util";
import { ItemFiltersType, ItemSortType } from "../../types/filter.type";

class DraftItemService {
  private static Instance: DraftItemService;
  constructor() {}
  public static getInstance(): DraftItemService {
    if (!DraftItemService.Instance) {
      DraftItemService.Instance = new DraftItemService();
    }
    return DraftItemService.Instance;
  }

  addDraftItem = warpAsync(
    async (
      data: ItemDraftDtoType,
      curUser: any
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ItemDraftDto,
      });
      if (!validationResult.success) return validationResult;
      await DraftItem.create({
        ...validationResult.data,
        userId: curUser.userId,
        userName: curUser.name,
        userImage: curUser.profileImage?.imageUrl,
        phone: curUser?.phone,
        prefixS3: uuidv4(),
      });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getDraftItem = warpAsync(
    async (_id: string): Promise<ServiceResponseType> => {
      return validateAndFormatData({
        data: await DraftItem.findById({ _id }).lean(),
        userDto: ItemDraftDto,
      });
    }
  );

  getAllDraftItem = warpAsync(
    async (
      queries: ItemFiltersType,
      sort: ItemSortType,
      userId: string
    ): Promise<ServiceResponseType> => {
      const filters = generateFilters<ItemFiltersType>(queries, "item");
      const count = await this.countDraftItems(userId, filters, true);
      return await generatePagination({
        model: DraftItem,
        userDto: ItemDraftDto,
        totalCount: count.count,
        paginationOptions: {
          sort: generateSort<ItemSortType>(sort),
          page: queries.page,
          limit: queries.limit,
        },
        fieldSearch: { userId, ...filters },
      });
    }
  );

  countDraftItems = warpAsync(
    async (
      userId: string,
      queries: ItemSortType,
      filtered?: boolean
    ): Promise<ServiceResponseType> => {
      const filters = filtered
        ? queries
        : generateFilters<ItemSortType>(queries);
      return serviceResponse({
        count: await DraftItem.countDocuments({
          userId,
          ...filters,
        }),
      });
    }
  );

  updateDraftItem = warpAsync(
    async (
      data: ItemDraftDtoType,
      _id: string
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ItemDraftDto,
        actionType: "update",
      });
      if (!validationResult.success) return validationResult;

      let angles: number[] = [];
      let keys: string[] = [];

      const {
        keysImageUnchanged = [],
        DraftItemImages = [],
        ...DraftItemData
      } = validationResult.data;

      let updatedDraftItem: any;
      if (DraftItemData || keysImageUnchanged > 0) {
        keysImageUnchanged?.map((image: any) => {
          keys.push(image.key);
          angles.push(image.angle);
        });
        [updatedDraftItem] = await Promise.all([
          DraftItem.updateOne(
            { _id },
            {
              $set: {
                ...DraftItemData,
              },
            }
          ),
          DraftItem.bulkWrite(
            keys.map((key, index) => ({
              updateOne: {
                filter: {
                  _id,
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

      if (DraftItemImages?.length > 0) {
        const newImage = {
          $push: {
            DraftItemImages: {
              $each: DraftItemImages,
            },
          },
        };
        updatedDraftItem = await DraftItem.updateOne({ _id }, newImage);
      }
      return serviceResponse({
        updatedCount: updatedDraftItem.modifiedCount,
      });
    }
  );

  deleteImages = warpAsync(
    async (
      deleteImageKeys: string[],
      _id: string
    ): Promise<ServiceResponseType> => {
      if (deleteImageKeys?.length > 0) {
        await DraftItem.updateOne(
          { _id },
          {
            $pull: {
              DraftItemImages: {
                key: { $in: deleteImageKeys },
              },
            },
          }
        );
      }
      return serviceResponse({
        statusText: "OK",
        message: "Delete image",
      });
    }
  );

  deleteDraftItem = warpAsync(
    async (_id: object): Promise<ServiceResponseType> => {
      return serviceResponse({
        deletedCount: (await DraftItem.deleteOne({ _id })).deletedCount,
      });
    }
  );
}

export default DraftItemService;
