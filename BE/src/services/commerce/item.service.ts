import Item from "../../models/mongodb/commerce/item.model";
import {
  ItemDto,
  ItemAddDto,
  ItemAddDtoType,
  ItemUpdateDtoType,
  ItemUpdateDto,
} from "../../dto/commerce/item.dto";
import { warpAsync } from "../../utils/warpAsync.util";
import { serviceResponse } from "../../utils/response.util";
import { ServiceResponseType } from "../../types/response.type";
import { validateAndFormatData } from "../../utils/validateAndFormatData.util";
import { generatePagination } from "../../utils/generatePagination.util";
import Address from "../../models/mongodb/user/address.model";
import { v4 as uuidv4 } from "uuid";
import { ItemFiltersType, ItemSortType } from "../../types/filter.type";
import {
  generateFilters,
  generateSort,
} from "../../utils/generateFilter&Sort.util";
import { UserRequestType } from "../../types/request.type";

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
    async (
      data: ItemAddDtoType,
      curUser: UserRequestType
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ItemAddDto,
      });
      await Item.create({
        ...validationResult.data,
        userId: curUser.userId,
        userName: curUser.name,
        userImage: curUser.profileImage?.imageUrl,
        phone: curUser?.phoneNumber,
        prefixS3: uuidv4(),
      });
      return serviceResponse({
        statusText: "Created",
      });
    }
  );

  getItem = warpAsync(async (_id: string): Promise<ServiceResponseType> => {
    const item = validateAndFormatData({
      data: await Item.findById({ _id }).lean(),
      userDto: ItemDto,
    });
    const address = await Address.findById({
      _id: item?.data?.location,
    }).lean();

    if (address) item.data.location = address;
    return serviceResponse({
      statusText: "OK",
      data: item,
    });
  });

  getAllItem = warpAsync(
    async (
      queries: ItemFiltersType,
      sort: ItemSortType
    ): Promise<ServiceResponseType> => {
      return await this.filterItem(queries, sort);
    }
  );

  countItems = warpAsync(
    async (
      queries: ItemSortType,
      filtered?: boolean
    ): Promise<ServiceResponseType> => {
      const filters = filtered
        ? queries
        : generateFilters<ItemSortType>(queries);
      return serviceResponse({
        count: await Item.countDocuments(filters),
      });
    }
  );

  getItemByCategoryId = warpAsync(
    async (categoryId: String): Promise<ServiceResponseType> => {
      return await this.filterItem({ categoryId });
    }
  );

  getItemBySubCategoryId = warpAsync(
    async (SubCategoryId: String): Promise<ServiceResponseType> => {
      return await this.filterItem({ SubCategoryId });
    }
  );

  updateItem = warpAsync(
    async (
      data: ItemUpdateDtoType,
      _id: object
    ): Promise<ServiceResponseType> => {
      const validationResult = validateAndFormatData({
        data,
        userDto: ItemUpdateDto,
        actionType: "update",
      });
      if (!validationResult.success) return validationResult;

      let angles: number[] = [];
      let keys: string[] = [];

      const {
        keysImageUnchanged = [],
        itemImages = [],
        ...itemData
      } = validationResult.data;

      let updatedItem: any;
      if (itemData || keysImageUnchanged > 0) {
        keysImageUnchanged?.map((image: any) => {
          keys.push(image.key);
          angles.push(image.angle);
        });
        [updatedItem] = await Promise.all([
          Item.updateOne(
            { _id },
            {
              $set: {
                ...itemData,
              },
            }
          ),
          Item.bulkWrite(
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

      if (itemImages?.length > 0) {
        const newImage = {
          $push: {
            itemImages: {
              $each: itemImages,
            },
          },
        };
        updatedItem = await Item.updateOne({ _id }, newImage);
      }
      return serviceResponse({
        updatedCount: updatedItem.modifiedCount,
      });
    }
  );

  deleteImages = warpAsync(
    async (
      deleteImageKeys: string[],
      _id: object
    ): Promise<ServiceResponseType> => {
      if (deleteImageKeys?.length > 0) {
        await Item.updateOne(
          { _id },
          {
            $pull: {
              itemImages: {
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

  private filterItem = warpAsync(
    async (
      queries: ItemFiltersType,
      sort: ItemSortType
    ): Promise<ServiceResponseType> => {
      const filters = generateFilters<ItemFiltersType>(queries, "item");
      const count = await this.countItems(filters, true);
      return await generatePagination({
        model: Item,
        userDto: ItemDto,
        totalCount: count.count,
        paginationOptions: {
          sort: generateSort<ItemSortType>(sort),
          page: queries.page,
          limit: queries.limit,
        },
        fieldSearch: filters,
      });
    }
  );

  deleteItem = warpAsync(async (_id: string): Promise<ServiceResponseType> => {
    return serviceResponse({
      deletedCount: (await Item.deleteOne({ _id })).deletedCount,
    });
  });
}

export default ItemService;
