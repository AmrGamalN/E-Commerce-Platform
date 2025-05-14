export const ratingIndexMap: Record<string, number> = {
  bad: 0,
  average: 1,
  good: 2,
  very_good: 3,
  excellent: 4,
};

export type ReviewType = "bad" | "average" | "good" | "veryGood" | "excellent";

export type ModelType = "item" | "draftItem";

export type ItemSortType = {
  price?: number;
  createdAt?: number;
};

export type ItemFiltersType = {
  page: number;
  limit: number;
  avgRating?: number;
  title?: ReviewType;
  communications?: string[];
  color?: string[];
  min?: number | string;
  max?: number | string;
  from?: string;
  to?: string;
  discount?: string | boolean;
  allowNegotiate?: string | boolean;
  category?: string;
  subcategory?: string;
  brand?: string;
  type?: string;
  condition?: string;
  location?: string;
  size?: string;
  material?: string;
};

export type ReviewFiltersType = {
  page: number;
  limit: number;
  title?: ReviewType;
  rate?: number;
};

export type ReviewSortType = {
  createdAt?: number;
};
