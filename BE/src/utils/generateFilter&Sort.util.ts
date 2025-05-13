import { ModelType, ratingIndexMap } from "../types/filter.type";
const notEqual = ["page", "limit", "min", "max" ,"from", "to"];

export const generateSort = <T extends Record<string, any>>(queries: T) => {
  const sort: Record<string, number> = {};
  if (queries.salary) sort["salary"] = Number(queries.salary);
  if (queries.createdAt) sort["createdAt"] = Number(queries.createdAt);
  return sort;
};

export const generateFilters = <T extends Record<string, any>>(
  queries: T,
  modelType?: ModelType
) => {
  const filtersOption = Object.keys(queries) as string[];
  let filters: Record<any, any> = {};

  if (modelType === "item") {
    filters = itemFilter(queries);
  }

  for (const key of filtersOption) {
    if (
      queries[key] &&
      typeof queries[key] == "string" &&
      !notEqual.includes(key)
    )
      filters[key] = queries[key];
  }

  return filters;
};

const itemFilter = (queries: any) => {
  let filters: Record<any, any> = {};

  if (queries.avgRating) {
    filters["rate.avgRating"] = { $gte: queries.avgRating };
  }

  if (queries.title && ratingIndexMap[queries.title] !== undefined) {
    const index = ratingIndexMap[queries.title];
    filters[`rate.rating.${index}`] = { $gte: 1 };
  }

  if (queries.communications?.length) {
    filters["communications"] = { $in: queries.communications };
  }

  if (queries.color?.length) {
    filters["color"] = { $in: queries.color };
  }

  if (queries.min && queries.max) {
    filters["price"] = {
      $gte: Number(queries.min),
      $lte: Number(queries.max),
    };
  }

  if (filters.from && queries.to) {
    filters["createdAt"] = {
      $gte: new Date(queries.from),
      $lte: new Date(queries.to),
    };
  }

  if (filters.discount)
    filters["isDiscount"] = queries.discount == "true" ? true : false;

  if (filters.allowNegotiate)
    filters["allowNegotiate"] = queries.allowNegotiate == "true" ? true : false;

  return filters;
};
