import { Model } from "mongoose";
import { validateAndFormatData } from "./validateAndFormatData";
import { responseHandler, serviceResponse } from "./responseHandler";

export const Pagination = async (
  model: Model<any>,
  Dto: any,
  count: number,
  args: { page: number; limit: number },
  query?: object,
  type?: "filter"
): Promise<responseHandler> => {
  if (!count || (type == "filter" && !Object.keys(query!).length))
    return serviceResponse({ statusText: "OK", data: [] });

  const page = Math.max(args.page, 1);
  const limit = args.limit ? Math.max(args.limit, 10) : 10;
  const skip = (page - 1) * limit;
  const retrievedModel = await model
    .find(query ?? {})
    .skip(skip)
    .limit(limit)
    .lean();

  const pareSafe = validateAndFormatData(retrievedModel, Dto, "getAll");
  if (!pareSafe.data?.length) return serviceResponse({ statusText: "OK",data: [] });

  const totalPages = Math.ceil(count / limit);
  const remainPages = totalPages - args.page;
  return {
    pagination: {
      currentPage: args.page,
      totalPages: totalPages,
      totalItems: count,
      totalMatched: pareSafe.data?.length,
      remainPages: remainPages > 0 ? remainPages : 0,
      itemsPerPage: limit,
    },
    ...pareSafe,
  };
};
