// types for the navbar data
export type Category = {
  _id: string;
  name: string;
  subcategories?: Subcategory[];
};

export type Subcategory = {
  _id: string;
  name: string;
  types?: Type[];
  brands?: Brand[];
  subcategories?: Subcategory[];
};

export type Type = {
  _id: string;
  name: string;
};

export type Brand = {
  _id: string;
  name: string;
};
