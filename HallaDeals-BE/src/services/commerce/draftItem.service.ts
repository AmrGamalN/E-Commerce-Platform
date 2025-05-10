import DraftItem from "../../models/mongodb/commerce/draftItem.model";
import {
  ItemDraftDto,
  ItemDraftDtoType,
} from "../../dto/commerce/draftItem.dto";
import { warpAsync } from "../../utils/warpAsync";
import { serviceResponse, responseHandler } from "../../utils/responseHandler";
import { validateAndFormatData } from "../../utils/validateAndFormatData";
import { Pagination } from "../../utils/pagination";
import { v4 as uuidv4 } from "uuid";

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
    async (data: ItemDraftDtoType, curUser: any): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, ItemDraftDto);
      const prefixS3 = uuidv4();
      await DraftItem.create({
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

  getDraftItem = warpAsync(async (query: object): Promise<responseHandler> => {
    const retrievedDraftItem = await DraftItem.findOne(query).lean();
    const validate = validateAndFormatData(retrievedDraftItem, ItemDraftDto);
    return serviceResponse({
      statusText: "OK",
      data: validate.data,
    });
  });

  getAllDraftItem = warpAsync(
    async (
      args: { page: number; limit: number },
      userId: string
    ): Promise<responseHandler> => {
      const count = await this.countDraftItems(userId);
      return Pagination(DraftItem, ItemDraftDto, count.count ?? 0, args);
    }
  );

  updateDraftItem = warpAsync(
    async (data: ItemDraftDtoType, query: object): Promise<responseHandler> => {
      const parsed = validateAndFormatData(data, ItemDraftDto, "update");
      if (!parsed.success) return parsed;

      let angles: number[] = [];
      let keys: string[] = [];

      const {
        keysImageUnchanged = [],
        DraftItemImages = [],
        ...DraftItemData
      } = parsed.data;

      let updatedDraftItem;
      if (DraftItemData || keysImageUnchanged > 0) {
        keysImageUnchanged?.map((image: any) => {
          keys.push(image.key);
          angles.push(image.angle);
        });
        [updatedDraftItem] = await Promise.all([
          DraftItem.findOneAndUpdate(
            query,
            {
              $set: {
                ...DraftItemData,
              },
            },
            { new: true }
          ),
          DraftItem.bulkWrite(
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

      if (DraftItemImages?.length > 0) {
        const newImage = {
          $push: {
            DraftItemImages: {
              $each: DraftItemImages,
            },
          },
        };
        updatedDraftItem = await DraftItem.findOneAndUpdate(query, newImage, {
          new: true,
        });
      }
      return serviceResponse({
        data: updatedDraftItem,
      });
    }
  );

  deleteImages = warpAsync(
    async (
      deleteImageKeys: string[],
      DraftItemId: string,
      userId: string
    ): Promise<responseHandler> => {
      if (deleteImageKeys?.length > 0) {
        const query: any = DraftItemId
          ? { _id: DraftItemId }
          : { userId: userId };
        await DraftItem.updateOne(query, {
          $pull: {
            DraftItemImages: {
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

  countDraftItems = warpAsync(
    async (userId: string): Promise<responseHandler> => {
      return serviceResponse({
        count: await DraftItem.countDocuments({ userId }),
      });
    }
  );

  deleteDraftItem = warpAsync(
    async (query: object): Promise<responseHandler> => {
      return serviceResponse({
        deleteCount: (await DraftItem.deleteOne(query)).deletedCount,
      });
    }
  );
}

export default DraftItemService;
