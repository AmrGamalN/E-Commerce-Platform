import { PaginationOptionsType, ValidateZodType } from "../types/utils.type";
import { serviceResponse } from "../utils/response.util";
import { ServiceResponseType } from "../types/response.type";
import { validateAndFormatData } from "./validateAndFormatData.util";

export const generatePagination = async ({
  model,
  userDto,
  adminDto,
  viewerRole,
  totalCount,
  paginationOptions,
  fieldSearch,
  populatePath,
  populateFilter,
}: PaginationOptionsType): Promise<ServiceResponseType> => {
  const page = Math.max(paginationOptions?.page || 1, 1);
  const limit = Math.max(paginationOptions?.limit || 10, 10);
  const skip = (page - 1) * limit;

  // Initialize model
  const documents = await initializeModel({
    model,
    userDto,
    adminDto,
    viewerRole,
    paginationOptions: {
      sort: paginationOptions?.sort,
      page,
      limit,
      skip,
    },
    fieldSearch,
    populatePath,
    populateFilter,
  });

  const validatedData = validateDataByZod({
    data: documents,
    userDto,
    adminDto,
    viewerRole,
    actionType: "getAll",
  });

  // Calculate pagination and return data
  const totalPages = Math.ceil(totalCount ?? 0 / limit);
  const remainPages = totalPages - page;
  return {
    paginateOptions: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount ?? 0,
      remainPages: remainPages > 0 ? remainPages : 0,
      itemsPerPage: limit,
    },
    ...validatedData,
  };
};

const initializeModel = async ({
  model,
  paginationOptions,
  fieldSearch,
  selectedFields,
  populatePath,
  populateFilter,
}: PaginationOptionsType) => {
  // Query
  let query = model
    .find(fieldSearch ?? {})
    .skip(paginationOptions?.skip!)
    .limit(paginationOptions?.limit!)
    .select(selectedFields);

  // Populate
  if (populatePath) {
    query = query.populate({
      path: populatePath,
      match: populateFilter,
    });
  }

  // Sort
  if (paginationOptions?.sort) {
    query = query.sort(paginationOptions?.sort);
  }

  return await query.lean();
};

// Validate & format data by Zod
const validateDataByZod = (options: ValidateZodType): ServiceResponseType => {
  const validatedData = validateAndFormatData(options);
  if (!validatedData.data)
    return serviceResponse({
      statusText: "NotFound",
      data: [],
    });
  return validatedData;
};
